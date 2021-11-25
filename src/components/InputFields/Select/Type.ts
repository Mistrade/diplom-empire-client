import React, {ReactNode} from 'react'
import {LabelComponentProps} from '../Label/Type'

export interface SelectedInputProps {
	divProps?: NotRequired<React.HTMLAttributes<HTMLDivElement>>,
	inputProps?: Omit<NotRequired<React.HTMLAttributes<HTMLInputElement>>, 'onChange' | 'value' | 'onFocus'>,
	labelProps?: LabelComponentProps['labelHTMLProps'],
	labelText?: LabelComponentProps['text'],
	onSelect?: (state: Nullable<SelectedDataProps>) => any,
	dataList: Array<SelectedDataProps>,
	initialSelected: Nullable<SelectedDataProps>,
	useForceSelect?: boolean,
	id: string,
	onlySelect?: boolean,
	useFilter?: boolean,
	isRequired?: LabelComponentProps['inputIsRequired'],
	placeholder?: string,
	onChange?: (v: string) => void,
	status?: StatusType
	clearState?: () => void,
	useStrictCleaner?: boolean,
	useArrowNavigation?: boolean,
	useSuggestion?: boolean
}


export type StatusType = 'correct' | 'incorrect' | 'insipid'
export type ForceSelectHandlerProps = (f: boolean, v: string, lf: boolean) => void
export type ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, select: Nullable<SelectedDataProps>) => void
export type FocusHandler = (e: React.FocusEvent<HTMLInputElement>) => void
export type GetListHandler = (v: string) => Array<SelectedDataProps>
export interface KeyboardIndexProps  {
	index: number,
	type: 'increment' | 'decrement'
}

export type Nullable<T> = null | T

export interface SelectedDataProps<T = any> {
	title: string,
	value: string,
	id?: string,
	index?: number,
	data?: T,
	subtitle?: string,
}

type NotRequired<T> = {
	[key in keyof T]?: T[key]
}