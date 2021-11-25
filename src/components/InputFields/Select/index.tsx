import React, {FC, useEffect, useRef, useState} from 'react'
import style from './style.module.sass'
import {
	ChangeHandler,
	FocusHandler,
	GetListHandler,
	Nullable,
	SelectedDataProps,
	SelectedInputProps,
	ForceSelectHandlerProps, KeyboardIndexProps, StatusType
} from './Type'
import {Label} from '../Label'
// import {Accept, Reject} from "../../Icons/Icons";

export const Select: React.FC<SelectedInputProps> = ({
	                                                     labelText,
	                                                     divProps,
	                                                     inputProps,
	                                                     dataList,
	                                                     labelProps,
	                                                     onSelect,
	                                                     id,
	                                                     onlySelect,
	                                                     isRequired,
	                                                     placeholder,
	                                                     initialSelected,
	                                                     onChange,
	                                                     status = 'insipid',
	                                                     useFilter = false,
	                                                     useForceSelect = false,
	                                                     useStrictCleaner = false,
	                                                     useArrowNavigation = false,
	                                                     useSuggestion = true,
                                                     }) => {
	const [value, setValue] = useState<string>(initialSelected?.title || '')
	const [focusable, setFocusable] = useState<boolean>(false)
	const [selected, setSelected] = useState<Nullable<SelectedDataProps>>(initialSelected) // Удалить когда буду подвязывать к Redux
	const [list, setList] = useState<Array<SelectedDataProps>>(dataList)
	const [listFocusable, setListFocusable] = useState<boolean>(false)
	const [keyboardIndex, setKeyboardIndex] = useState<Nullable<KeyboardIndexProps>>(null)
	const [suggestion, setSuggestion] = useState<string>('')
	const listContainerRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const listRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!useFilter && useSuggestion) {
			console.warn(`Для использования подсказок в поле ввода необходимо включить useFilter! Поле ввода - ${labelText}`)
		}
	}, [])
	
	useEffect(() => {
		document.addEventListener('click', outputClickHandler)
		return () => document.removeEventListener('click', outputClickHandler)
	}, [])
	
	useEffect(() => {
		if (keyboardIndex !== null && listRef.current && useArrowNavigation && focusable) {
			const item = listRef.current.querySelector(`.${style.keyboardSelected}`)
			const scrollHeight = item?.scrollHeight || 0
			if (keyboardIndex.type === 'decrement') {
				listRef.current.scrollTop += scrollHeight
			} else if (keyboardIndex.type === 'increment') {
				listRef.current.scrollTop -= scrollHeight
			}
		}
	}, [keyboardIndex, listRef, useArrowNavigation, focusable])
	
	useEffect(() => {
		if (useFilter) {
			const newList = dataList.filter((item, index) => {
				return item.title.toLowerCase().includes(value.toLowerCase()) || item.subtitle?.toLowerCase().includes(value.toLowerCase().trim())
			})
			setList(newList)
			
			if (useSuggestion) {
				if (!!value) {
					const regexp = new RegExp(value, 'i')
					const suggestWithTitle = list.filter((item) => item.title.toLowerCase().startsWith(value.toLowerCase()))
					
					if (!suggestWithTitle.length) {
						
						const suggestWithSubtitle = list.filter((item) => item.subtitle?.toLowerCase().startsWith(value.toLowerCase()))
						return setSuggestion(suggestWithSubtitle[0]?.subtitle?.replace(regexp, '') || '')
					}
					
					return setSuggestion(suggestWithTitle[0]?.title?.replace(regexp, '') || '')
				} else {
					setSuggestion('')
				}
			}
		}
	}, [value, useFilter, useSuggestion])
	
	useEffect(() => {
		if (focusable) {
			const length = inputRef.current?.value.length || 0
			inputRef.current?.setSelectionRange(length, length)
		} else {
			setKeyboardIndex(null)
		}
	}, [focusable])
	
	useEffect(() => {
		if (useForceSelect && !!value && !listFocusable && !focusable && !selected) {
			forceSelectHandler(focusable, value, listFocusable)
		}
	}, [focusable, value, useForceSelect, listFocusable, selected])
	
	useEffect(() => {
		if (!!selected) {
			setValue(selected.title)
		}
	}, [selected])
	
	const outputClickHandler = (e: MouseEvent) => {
		const el = e.target as Element
		if (
			listContainerRef.current
			&& !listContainerRef.current.contains(el)
			&& listRef.current
			&& !listRef.current.contains(el)
			&& !el.classList.value.includes(style.bluringList)
		) {
			setListFocusable(false)
		}
	}
	
	const forceSelectHandler: ForceSelectHandlerProps = (f, v, lf) => {
		setSelected(prev => {
			if (!!v && !f && !lf) {
				return dataList.filter((item) => item.title.toLowerCase().trim() === v.toLowerCase().trim())[0]
					|| dataList.filter((item) => item.title.toLowerCase().trim().includes(v.toLowerCase().trim()))[0]
					|| prev
			}
			return prev
		})
	}
	
	const handleChange: ChangeHandler = (e, select) => {
		setValue(e.target.value)
		onChange && onChange(e.target.value)
		
		if ((!!select && useStrictCleaner) || !e.target.value) {
			setSelected(null)
			onSelect && onSelect(null)
		}
	}
	
	const handleFocusable: FocusHandler = (e) => {
		if (e.type === 'focus') {
			setListFocusable(true)
			setFocusable(true)
		} else if (e.type === 'blur') {
			setFocusable(false)
		}
	}
	
	const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'ArrowDown' || e.key === 'ArrowDown') {
			setKeyboardIndex(prev => {
				if (prev?.index !== null && prev?.index !== undefined) {
					let index = prev.index
					let type: KeyboardIndexProps['type'] = 'decrement'
					index++
					if (index + 1 > list.length) {
						index = 0
						type = 'increment'
					}
					console.log('Arrow DOWN, index: ', index, ', and prev index: ', prev.index)
					return {index, type}
				} else {
					return {index: 0, type: 'decrement'}
				}
			})
		} else if (e.code === 'ArrowUp' || e.key === 'ArrowUp') {
			setKeyboardIndex(prev => {
				if (!!prev?.index) {
					let index = prev.index
					index--
					console.log('Arrow Up, prev index: ', index, prev.index)
					let type: KeyboardIndexProps['type'] = 'increment'
					
					return {index, type}
				} else {
					return null
				}
			})
		} else if (e.code === 'Enter' && !!keyboardIndex) {
			selectedHandle(list[keyboardIndex.index])
		} else if (e.code === 'Escape') {
			setFocusable(false)
			setListFocusable(false)
			inputRef.current?.blur()
		}
	}
	
	const selectedHandle = (item: Nullable<SelectedDataProps>) => {
		setSelected(item)
		setListFocusable(false)
		onSelect && onSelect(item)
		setValue('')
	}
	
	const setClassName = (s: StatusType, f: typeof focusable, placement: 'input' | 'selected_list'): string => {
		if (placement === 'input') {
			let initialClassName = `${style.input} `
			
			if (f) {
				return initialClassName
			}
			switch (s) {
				case 'correct':
					return initialClassName += `${style.inputDone}`
				case 'incorrect':
					return initialClassName += `${style.inputError}`
				case 'insipid':
					return initialClassName
			}
		} else if (placement === 'selected_list') {
			let initialClassName = `${style.selectedList} `
			
			if (f) {
				return initialClassName
			}
			switch (s) {
				case 'correct':
					return initialClassName += `${style.done}`
				case 'incorrect':
					return initialClassName += `${style.error}`
				case 'insipid':
					return initialClassName
			}
		}
		
		return ''
	}
	
	const Icon: FC<{ s: StatusType }> = () => {
		return (
			<>
				{status === 'correct' ? (
					<>
						{/*<Accept color={'greenColor'} size={20} containerClassName={style.resultIcon}/>*/}
					</>
				) : status === 'incorrect' ? (
					<>
						{/*<Reject color={'dangerColor'} size={20} containerClassName={style.resultIcon}/>*/}
					</>
				) : (
					''
				)}
			</>
		)
	}
	
	return (
		<div {...divProps} className={style.container} ref={listContainerRef}>
			<Label
				text={typeof labelText === 'string' ? labelText.substr(0, 30) + '...' : '' || ''}
				labelHTMLProps={labelProps}
				inputIsRequired={!!isRequired}
			/>
			<div className={style.inputContainer}>
				<input
					{...inputProps}
					className={setClassName(status, focusable, 'input')}
					value={value}
					onChange={(e) => handleChange(e, selected)}
					onBlur={handleFocusable}
					onFocus={handleFocusable}
					onKeyDown={(e) => useArrowNavigation ? keyDownHandler(e) : null}
					readOnly={onlySelect}
					placeholder={placeholder}
					ref={inputRef}
					id={id}
				/>
				{focusable ? (
					<div className={style.input_suggestion} onClick={() => inputRef.current?.focus()}>
            <span className={style.input_value} style={{opacity: 0}}>
              {value}
            </span>
						<span className={style.input_suggestion_value}>
              {`${suggestion}`}
            </span>
					</div>
				) : ''}
				{!focusable && !!status ? (
					<Icon s={status}/>
				) : ''}
			</div>
			{focusable || listFocusable ? (
				<div
					className={`${setClassName(status, focusable, 'selected_list')} ${!focusable ? style.non_focusable : ''}`}
					ref={listRef}
				>
					<div className={`${style.suggestionItem} ${!!list.length ? style.non_empty : ''}`}>
						{list.length > 0 ? (
							<>
								{useFilter ? 'Выберите необходимое значение из списка ниже, нажав на него или продолжите ввод для фильтрации списка.' : 'Выберите необходимое значение из списка ниже, нажав на него.'}
							</>
						) : (
							<>
								Предложений по вашему вводу не найдено. Укажите корректный ввод и выберите значение из списка.
							</>
						)}
					</div>
					{onlySelect && !!selected && !isRequired ? (
						<div className={style.selectedItem} tabIndex={0} onClick={() => selectedHandle(null)}>
							Оставить поле не заполненным
						</div>
					) : ''}
					{list.map((item, index) => {
						const overlap = value && selected
							? item.title.toLowerCase().trim() === selected.title.toLowerCase().trim() && item.value === selected.value
							: false
						return (
							<div
								className={`${style.selectedItem} ${overlap ? style.overlap : ''} ${index === keyboardIndex?.index ? style.keyboardSelected : ''}`}
								tabIndex={0}
								onClick={(e) => selectedHandle(item)}
								key={`${labelText}_${index}`}
							>
								<div className={style.selectedItem__textContainer}>

                <span className={style.selectedItem_title}>
                  {item.title}
                </span>
									{item.subtitle ? (
										<span className={style.selectedItem_subtitle}>
                    {item.subtitle}
                  </span>
									) : ''}
								</div>
								{overlap ? (
									<>
										{/*<Accept color={'greenColor'} size={16}/>*/}
									</>
								) : ''}
							</div>
						)
					})}
					{!focusable && list.length >= 2 ? (
						<div className={style.bluringList} onClick={() => inputRef.current?.focus()}/>
					) : ''}
				</div>
			) : ''}
		</div>
	)
}