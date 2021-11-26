import React from 'react'

interface IconProps {
  size: number,
  color?: string
}

export const CreateIcon: React.FC<Omit<IconProps, 'color'>> = ( { size = 50 } ) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size}>
      <linearGradient id="KJ7ka9GQp0CHqT_2YsWMsa" x1="32" x2="32" y1="5.75" y2="59.005"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#KJ7ka9GQp0CHqT_2YsWMsa)"
            d="M32,58C17.663,58,6,46.337,6,32S17.663,6,32,6s26,11.663,26,26S46.337,58,32,58z M32,8 C18.767,8,8,18.767,8,32s10.767,24,24,24s24-10.767,24-24S45.233,8,32,8z"/>
      <linearGradient id="KJ7ka9GQp0CHqT_2YsWMsb" x1="32" x2="32" y1="5.75" y2="59.005"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#KJ7ka9GQp0CHqT_2YsWMsb)"
            d="M32,52c-11.028,0-20-8.972-20-20s8.972-20,20-20s20,8.972,20,20S43.028,52,32,52z M32,14 c-9.925,0-18,8.075-18,18s8.075,18,18,18s18-8.075,18-18S41.925,14,32,14z"/>
      <linearGradient id="KJ7ka9GQp0CHqT_2YsWMsc" x1="32" x2="32" y1="21.75" y2="42.538"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#6dc7ff"/>
        <stop offset="1" stopColor="#e6abff"/>
      </linearGradient>
      <path fill="url(#KJ7ka9GQp0CHqT_2YsWMsc)"
            d="M41,30h-7v-7c0-0.552-0.448-1-1-1h-2c-0.552,0-1,0.448-1,1v7h-7c-0.552,0-1,0.448-1,1v2 c0,0.552,0.448,1,1,1h7v7c0,0.552,0.448,1,1,1h2c0.552,0,1-0.448,1-1v-7h7c0.552,0,1-0.448,1-1v-2C42,30.448,41.552,30,41,30z"/>
    </svg>
  )
}

export const TheSunIcon: React.FC<Omit<IconProps, 'color'>> = ( { size = 25 } ) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size}>
      <linearGradient id="tXu54Kp6YqZVIlGnJHOxOa" x1="32" x2="32" y1="38.5" y2="45.502"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#6dc7ff"/>
        <stop offset="1" stopColor="#e6abff"/>
      </linearGradient>
      <path fill="url(#tXu54Kp6YqZVIlGnJHOxOa)"
            d="M27.107,39c-0.615,0-1.114,0.553-0.996,1.157C26.651,42.917,29.082,45,32,45 c2.918,0,5.349-2.083,5.888-4.843C38.007,39.553,37.508,39,36.893,39H27.107z"/>
      <linearGradient id="tXu54Kp6YqZVIlGnJHOxOb" x1="32" x2="32" y1="5.333" y2="58.718"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#tXu54Kp6YqZVIlGnJHOxOb)"
            d="M32,12c-11.028,0-20,8.972-20,20s8.972,20,20,20s20-8.972,20-20S43.028,12,32,12z M32,50 c-9.925,0-18-8.075-18-18s8.075-18,18-18s18,8.075,18,18S41.925,50,32,50z"/>
      <linearGradient id="tXu54Kp6YqZVIlGnJHOxOc" x1="32" x2="32" y1="5.333" y2="58.718"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#tXu54Kp6YqZVIlGnJHOxOc)"
            d="M36,27c-1.103,0-2,1-2,2h-4c0-1-0.897-2-2-2l-10,0c-1.103,0-2,0.897-2,2l0,2 c0,3.309,2.691,6,6,6l2,0c3.309,0,6-2.691,6-6l4,0c0,3.309,2.691,6,6,6h2c3.309,0,6-2.691,6-6v-2c0-1.103-0.897-2-2-2H36z M28,31 c0,2.206-1.794,4-4,4l-2,0c-2.206,0-4-1.794-4-4l0-2l1.586,0l-0.293,0.293c-0.391,0.391-0.391,1.023,0,1.414 C19.488,30.902,19.744,31,20,31s0.512-0.098,0.707-0.293L22.414,29l2.172,0l-2.293,2.293c-0.391,0.391-0.391,1.023,0,1.414 C22.488,32.902,22.744,33,23,33s0.512-0.098,0.707-0.293L27.414,29H28L28,31z M46,31c0,2.206-1.794,4-4,4h-2c-2.206,0-4-1.794-4-4 v-2h1.586l-0.293,0.293c-0.391,0.391-0.391,1.023,0,1.414C37.488,30.902,37.744,31,38,31s0.512-0.098,0.707-0.293L40.414,29h2.172 l-2.293,2.293c-0.391,0.391-0.391,1.023,0,1.414C40.488,32.902,40.744,33,41,33s0.512-0.098,0.707-0.293L45.414,29H46V31z"/>
      <linearGradient id="tXu54Kp6YqZVIlGnJHOxOd" x1="26.409" x2="26.409" y1="5.333" y2="58.718"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#tXu54Kp6YqZVIlGnJHOxOd)"
            d="M20.819,23c0.274,0,0.548-0.112,0.745-0.333C24.22,19.701,28.023,18,31.999,18 c0.553,0,1-0.447,1-1c0-0.553-0.447-1-1-1c-4.544,0-8.891,1.943-11.925,5.333c-0.368,0.411-0.333,1.044,0.078,1.412 C20.343,22.916,20.581,23,20.819,23z"/>
      <linearGradient id="tXu54Kp6YqZVIlGnJHOxOe" x1="32" x2="32" y1="5.333" y2="58.718"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#tXu54Kp6YqZVIlGnJHOxOe)"
            d="M58,32c0-1.912-1.209-3.766-3.345-5.167c0.229-1.288,0.093-2.596-0.403-3.824 c-0.529-1.312-1.445-2.426-2.618-3.203c0.566-2.548,0.118-4.823-1.249-6.19s-3.641-1.815-6.19-1.249 c-0.777-1.173-1.892-2.089-3.204-2.618c-1.228-0.497-2.534-0.634-3.823-0.403C35.766,7.209,33.912,6,32,6s-3.766,1.209-5.167,3.345 c-1.289-0.23-2.597-0.094-3.824,0.403c-1.31,0.529-2.43,1.446-3.208,2.617c-2.546-0.567-4.82-0.116-6.186,1.25 c-1.367,1.367-1.815,3.643-1.249,6.19c-1.173,0.777-2.089,1.892-2.618,3.204c-0.496,1.228-0.633,2.535-0.403,3.823 C7.209,28.234,6,30.088,6,32s1.209,3.766,3.345,5.167c-0.229,1.288-0.093,2.596,0.403,3.824c0.529,1.312,1.445,2.426,2.618,3.203 c-0.566,2.548-0.118,4.823,1.249,6.19c1.368,1.368,3.647,1.817,6.19,1.248c0.778,1.174,1.893,2.09,3.204,2.619 c1.228,0.497,2.534,0.634,3.823,0.403C28.234,56.791,30.088,58,32,58s3.766-1.209,5.167-3.345c1.289,0.23,2.597,0.094,3.824-0.403 c1.311-0.529,2.425-1.445,3.203-2.619c2.546,0.569,4.823,0.12,6.19-1.248c1.367-1.367,1.815-3.643,1.249-6.19 c1.173-0.777,2.089-1.892,2.618-3.204c0.496-1.228,0.633-2.535,0.403-3.823C56.791,35.766,58,33.912,58,32z M53.024,35.82 c-0.403,0.229-0.597,0.705-0.467,1.15c0.319,1.092,0.264,2.223-0.159,3.271c-0.451,1.116-1.294,2.032-2.374,2.58 c-0.431,0.218-0.644,0.713-0.507,1.176c0.634,2.139,0.429,3.997-0.547,4.974c-0.977,0.977-2.834,1.182-4.974,0.546 c-0.46-0.135-0.958,0.076-1.176,0.507c-0.548,1.08-1.464,1.924-2.579,2.375c-1.049,0.423-2.18,0.479-3.271,0.159 c-0.447-0.133-0.922,0.063-1.15,0.467C34.764,54.888,33.336,56,32,56s-2.764-1.112-3.82-2.976c-0.182-0.319-0.518-0.507-0.87-0.507 c-0.093,0-0.188,0.013-0.28,0.04c-1.093,0.319-2.224,0.264-3.271-0.159c-1.116-0.451-2.032-1.295-2.58-2.375 c-0.219-0.431-0.717-0.641-1.176-0.507c-2.14,0.636-3.997,0.431-4.974-0.546c-0.976-0.977-1.181-2.835-0.547-4.974 c0.137-0.463-0.076-0.958-0.507-1.176c-1.08-0.548-1.923-1.464-2.374-2.579c-0.423-1.049-0.479-2.18-0.159-3.271 c0.13-0.445-0.063-0.921-0.467-1.15C9.112,34.764,8,33.336,8,32s1.112-2.764,2.976-3.82c0.403-0.229,0.597-0.705,0.467-1.15 c-0.319-1.092-0.264-2.223,0.159-3.271c0.451-1.116,1.294-2.032,2.374-2.58c0.431-0.218,0.644-0.713,0.507-1.176 c-0.634-2.139-0.429-3.997,0.547-4.974c0.976-0.976,2.836-1.181,4.974-0.547c0.468,0.136,0.962-0.079,1.179-0.512l0.056-0.119 c0.552-1.017,1.447-1.815,2.521-2.25c1.049-0.423,2.18-0.479,3.271-0.159c0.443,0.131,0.921-0.063,1.15-0.467 C29.236,9.112,30.664,8,32,8s2.764,1.112,3.82,2.976c0.229,0.403,0.704,0.598,1.15,0.467c1.091-0.321,2.223-0.264,3.271,0.159 c1.116,0.451,2.032,1.294,2.58,2.374c0.218,0.43,0.707,0.642,1.176,0.507c2.137-0.633,3.998-0.43,4.974,0.547 s1.181,2.835,0.547,4.974c-0.137,0.463,0.076,0.958,0.507,1.176c1.08,0.548,1.923,1.464,2.374,2.579 c0.423,1.049,0.479,2.18,0.159,3.271c-0.13,0.445,0.063,0.921,0.467,1.15C54.888,29.236,56,30.664,56,32S54.888,34.764,53.024,35.82 z"/>
    </svg>
  )
}

export const FolderIcon: React.FC<Omit<IconProps, 'color'>> = ( { size = 25 } ) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size}>
      <linearGradient id="UC11dU6fpD1Whu1sZEZF0a" x1="14.296" x2="14.296" y1="42.833" y2="53.022"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#6dc7ff"/>
        <stop offset="1" stopColor="#e6abff"/>
      </linearGradient>
      <path fill="url(#UC11dU6fpD1Whu1sZEZF0a)"
            d="M11.702,43.702l6.596,6.596C18.926,50.926,18.481,52,17.593,52H12c-1.105,0-2-0.895-2-2 v-5.593C10,43.519,11.074,43.074,11.702,43.702z"/>
      <linearGradient id="UC11dU6fpD1Whu1sZEZF0b" x1="32" x2="32" y1="8" y2="55.938"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#UC11dU6fpD1Whu1sZEZF0b)"
            d="M55,20h-1v-6c0-1.654-1.346-3-3-3v-1c0-1.103-0.897-2-2-2H15c-1.103,0-2,0.897-2,2v1 c-1.654,0-3,1.346-3,3v6H9c-1.654,0-3,1.346-3,3v6v1v21c0,2.757,2.243,5,5,5h42c2.757,0,5-2.243,5-5V31v-2v-6 C58,21.346,56.654,20,55,20z M55,22c0.552,0,1,0.448,1,1v2.026c-0.584-0.442-1.257-0.773-2-0.925V22H55z M15,10h34v1H15V10z M13,13 h38c0.552,0,1,0.448,1,1v10h-9.929c-1.007,0-1.94,0.5-2.497,1.337l-2.813,4.218C36.575,29.833,36.265,30,35.929,30h-7.857 c-0.336,0-0.646-0.167-0.833-0.446l-2.813-4.216C23.869,24.5,22.936,24,21.929,24H12V14C12,13.448,12.448,13,13,13z M9,22h1v2.101 c-0.743,0.152-1.416,0.482-2,0.925V23C8,22.448,8.448,22,9,22z M56,51c0,1.654-1.346,3-3,3H11c-1.654,0-3-1.346-3-3V30v-1 c0-1.654,1.346-3,3-3h10.929c0.336,0,0.646,0.167,0.833,0.446l2.813,4.216C26.131,31.5,27.064,32,28.071,32h7.857 c1.007,0,1.94-0.5,2.497-1.337l2.813-4.218C41.425,26.167,41.735,26,42.071,26H53c1.654,0,3,1.346,3,3v2V51z"/>
      <linearGradient id="UC11dU6fpD1Whu1sZEZF0c" x1="33" x2="33" y1="8" y2="55.938"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#UC11dU6fpD1Whu1sZEZF0c)" d="M21 17H45V19H21z"/>
      <linearGradient id="UC11dU6fpD1Whu1sZEZF0d" x1="49" x2="49" y1="8" y2="55.938"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#UC11dU6fpD1Whu1sZEZF0d)" d="M44 50H54V52H44z"/>
      <linearGradient id="UC11dU6fpD1Whu1sZEZF0e" x1="49" x2="49" y1="8" y2="55.938"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#UC11dU6fpD1Whu1sZEZF0e)" d="M44 46H54V48H44z"/>
      <linearGradient id="UC11dU6fpD1Whu1sZEZF0f" x1="32" x2="32" y1="8" y2="55.938"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#UC11dU6fpD1Whu1sZEZF0f)" d="M27 21H37V23H27z"/>
      <linearGradient id="UC11dU6fpD1Whu1sZEZF0g" x1="32" x2="32" y1="8" y2="55.938"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#UC11dU6fpD1Whu1sZEZF0g)" d="M29 25H35V27H29z"/>
    </svg>
  )
}

export const TickBoxIcon: React.FC<Omit<IconProps, 'color'>> = ( { size = 25 } ) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size}>
      <linearGradient id="Cp5wM0jolLcVp937tr9tFa" x1="32" x2="32" y1="6.75" y2="57.51"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#Cp5wM0jolLcVp937tr9tFa)"
            d="M52,57H12c-2.757,0-5-2.243-5-5V12c0-2.757,2.243-5,5-5h40c2.757,0,5,2.243,5,5v40 C57,54.757,54.757,57,52,57z M12,9c-1.654,0-3,1.346-3,3v40c0,1.654,1.346,3,3,3h40c1.654,0,3-1.346,3-3V12c0-1.654-1.346-3-3-3H12z"/>
      <linearGradient id="Cp5wM0jolLcVp937tr9tFb" x1="32" x2="32" y1="6.75" y2="57.51"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#Cp5wM0jolLcVp937tr9tFb)"
            d="M48,51H16c-1.654,0-3-1.346-3-3V16c0-1.654,1.346-3,3-3h32c1.654,0,3,1.346,3,3v1.418 L31.995,36.167l-7.872-7.872l-2.828,2.824l9.99,9.791c0.188,0.188,0.439,0.09,0.706,0.09c0.001,0,0.002,0,0.003,0 c0.269,0,0.52,0.097,0.708-0.094L51,22.563V48C51,49.654,49.654,51,48,51z M16,15c-0.552,0-1,0.448-1,1v32c0,0.552,0.448,1,1,1h32 c0.552,0,1-0.448,1-1V27.438L34.125,42.312C33.559,42.885,32.805,43,32,43c-0.003,0-0.006,0-0.009,0 c-0.801,0-1.554-0.109-2.12-0.676l-9.99-9.889c-0.781-0.78-0.781-2,0-2.781l2.824-2.799c0.781-0.781,2.051-0.769,2.832,0.013 l6.468,6.474L49,16.582V16c0-0.552-0.448-1-1-1H16z"/>
      <linearGradient id="Cp5wM0jolLcVp937tr9tFc" x1="22" x2="22" y1="37.25" y2="47.115"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#6dc7ff"/>
        <stop offset="1" stopColor="#e6abff"/>
      </linearGradient>
      <path fill="url(#Cp5wM0jolLcVp937tr9tFc)" d="M27,47h-9c-0.552,0-1-0.448-1-1v-9L27,47z"/>
    </svg>
  )
}

export const OkIcon: React.FC<Omit<IconProps, 'color'>> = ( { size = 25 } ) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size}>
      <linearGradient id="npWyVMH_SNRmaD~1Sft4Ca" x1="32" x2="32" y1="7" y2="55.84"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#npWyVMH_SNRmaD~1Sft4Ca)"
            d="M54.996,37.446c-0.974-1.03-2.112-1.836-3.351-2.414C51.879,33.706,52,32.355,52,31 C52,18.317,41.683,8,29,8S6,18.317,6,31s10.317,23,23,23c3.32,0,6.504-0.692,9.485-2.047C40.504,54.421,43.57,56,47,56 c6.065,0,11-4.935,11-11C58,42.18,56.934,39.497,54.996,37.446z M29,52C17.421,52,8,42.579,8,31s9.421-21,21-21s21,9.421,21,21 c0,1.126-0.095,2.247-0.272,3.352C48.848,34.128,47.936,34,47,34c-6.065,0-11,4.935-11,11c0,1.91,0.491,3.706,1.35,5.273 C34.719,51.418,31.916,52,29,52z M47,54c-4.963,0-9-4.037-9-9s4.037-9,9-9c2.5,0,4.824,1.001,6.543,2.819 C55.127,40.498,56,42.692,56,45C56,49.963,51.963,54,47,54z"/>
      <linearGradient id="npWyVMH_SNRmaD~1Sft4Cb" x1="48.5" x2="48.5" y1="7" y2="55.84"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#npWyVMH_SNRmaD~1Sft4Cb)"
            d="M52.793 41.793L47 47.586 44.207 44.793 42.793 46.207 47 50.414 54.207 43.207z"/>
      <linearGradient id="npWyVMH_SNRmaD~1Sft4Cc" x1="20.041" x2="20.041" y1="7" y2="55.84"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#npWyVMH_SNRmaD~1Sft4Cc)"
            d="M11.082,24.667l1.885,0.666c1.695-4.796,5.57-8.671,10.367-10.366 C25.15,14.325,27.057,14,29,14v-2c-2.171,0-4.302,0.364-6.332,1.082C17.307,14.976,12.976,19.307,11.082,24.667z"/>
      <linearGradient id="npWyVMH_SNRmaD~1Sft4Cd" x1="20" x2="20" y1="24.25" y2="34.27"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#6dc7ff"/>
        <stop offset="1" stopColor="#e6abff"/>
      </linearGradient>
      <path fill="url(#npWyVMH_SNRmaD~1Sft4Cd)" d="M20 25A4 4 0 1 0 20 33A4 4 0 1 0 20 25Z"/>
      <linearGradient id="npWyVMH_SNRmaD~1Sft4Ce" x1="38" x2="38" y1="24.25" y2="34.27"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#6dc7ff"/>
        <stop offset="1" stopColor="#e6abff"/>
      </linearGradient>
      <path fill="url(#npWyVMH_SNRmaD~1Sft4Ce)" d="M38 25A4 4 0 1 0 38 33A4 4 0 1 0 38 25Z"/>
      <linearGradient id="npWyVMH_SNRmaD~1Sft4Cf" x1="29" x2="29" y1="34.875" y2="45.128"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#6dc7ff"/>
        <stop offset="1" stopColor="#e6abff"/>
      </linearGradient>
      <path fill="url(#npWyVMH_SNRmaD~1Sft4Cf)"
            d="M34,36H24c-0.552,0-1,0.448-1,1v1c0,3.314,2.686,6,6,6s6-2.686,6-6v-1 C35,36.448,34.552,36,34,36z"/>
    </svg>
  )
}

export const DoneIcon: React.FC<Omit<IconProps, 'color'>> = ( { size = 25 } ) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size}>
      <linearGradient id="D8kn8RyCktjRlx36eKmJ5a" x1="32" x2="32" y1="12.664" y2="52.422"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#D8kn8RyCktjRlx36eKmJ5a)"
            d="M24.982,51c-1.273,0-2.547-0.475-3.524-1.429L6.888,35.364C6.315,34.806,6,34.061,6,33.268 s0.315-1.538,0.889-2.097l2.82-2.75c1.166-1.137,3.063-1.137,4.228,0.001l10.259,10.003c0.395,0.385,1.058,0.38,1.446-0.012 l24.341-24.526c1.147-1.156,3.044-1.186,4.228-0.068l2.867,2.705c0.582,0.55,0.91,1.29,0.923,2.083 c0.013,0.793-0.291,1.542-0.854,2.109L28.565,49.514C27.584,50.504,26.283,51,24.982,51z M11.822,29.564 c-0.26,0-0.52,0.097-0.717,0.29l-2.82,2.75C8.101,32.783,8,33.018,8,33.268s0.102,0.485,0.285,0.664l14.569,14.208 c1.19,1.163,3.116,1.148,4.291-0.034l28.581-28.798c0.181-0.182,0.277-0.418,0.273-0.668c-0.004-0.25-0.109-0.485-0.296-0.661 l-2.867-2.705c-0.401-0.381-1.047-0.369-1.435,0.022L27.061,39.823c-1.166,1.173-3.079,1.189-4.263,0.034L12.54,29.853 C12.343,29.66,12.083,29.564,11.822,29.564z"/>
      <linearGradient id="D8kn8RyCktjRlx36eKmJ5b" x1="32.013" x2="32.013" y1="16.83" y2="47.526"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#6dc7ff"/>
        <stop offset="1" stopColor="#e6abff"/>
      </linearGradient>
      <path fill="url(#D8kn8RyCktjRlx36eKmJ5b)"
            d="M24.977,46.609c-0.489,0-0.98-0.181-1.368-0.544L10.318,33.603l1.367-1.459l13.292,12.461 L52.293,17.29l1.414,1.414L26.391,46.019C26,46.411,25.489,46.609,24.977,46.609z"/>
    </svg>
  )
}

export const SynchronizeIcon: React.FC<Omit<IconProps, 'color'>> = ( { size = 25 } ) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size}>
      <linearGradient id="IaTgA~1Np_BMY0IkWaeQ3a" x1="32" x2="32" y1="3.25" y2="61.803"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#IaTgA~1Np_BMY0IkWaeQ3a)"
            d="M32,43c6.065,0,11-4.935,11-11s-4.935-11-11-11s-11,4.935-11,11S25.935,43,32,43z M32,23 c4.963,0,9,4.037,9,9s-4.037,9-9,9s-9-4.037-9-9S27.037,23,32,23z"/>
      <linearGradient id="IaTgA~1Np_BMY0IkWaeQ3b" x1="22.5" x2="22.5" y1="3.25" y2="61.803"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#IaTgA~1Np_BMY0IkWaeQ3b)"
            d="M11.811,37.719C14.237,36.95,16,34.677,16,32c0-2.679-1.765-4.952-4.192-5.72 C14.261,17.56,21.939,11.464,31,11.042v3.001c0,0.702,0.367,1.333,0.983,1.688c0.31,0.179,0.656,0.268,1.003,0.268 c0.35,0,0.699-0.09,1.01-0.271l5.548-3.223C40.455,11.974,41,11.038,41,10s-0.545-1.974-1.457-2.504l-5.547-3.223 c-0.619-0.362-1.392-0.362-2.013-0.004C31.367,4.624,31,5.255,31,5.957v3.085C20.94,9.47,12.419,16.282,9.81,26.01 C6.589,26.111,4,28.756,4,32c0,3.245,2.591,5.89,5.812,5.99c1.394,5.176,4.539,9.713,8.958,12.825l1.152-1.635 C15.956,46.389,13.117,42.341,11.811,37.719z M38.538,9.225C38.955,9.467,39,9.848,39,10s-0.045,0.533-0.461,0.775L33,13.985 l-0.008-7.983L38.538,9.225z M6,32c0-2.206,1.794-4,4-4s4,1.794,4,4s-1.794,4-4,4S6,34.206,6,32z"/>
      <linearGradient id="IaTgA~1Np_BMY0IkWaeQ3c" x1="41.5" x2="41.5" y1="3.25" y2="61.803"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#IaTgA~1Np_BMY0IkWaeQ3c)"
            d="M60,32c0-3.245-2.591-5.89-5.812-5.99c-1.394-5.176-4.539-9.713-8.958-12.825l-1.152,1.635 c3.966,2.792,6.805,6.84,8.111,11.461C49.763,27.05,48,29.323,48,32c0,2.679,1.765,4.952,4.193,5.721 C49.74,46.44,42.061,52.536,33,52.958v-3.001c0-0.702-0.367-1.333-0.983-1.688c-0.623-0.359-1.395-0.358-2.013,0.004l-5.548,3.223 C23.545,52.026,23,52.962,23,54s0.545,1.974,1.457,2.504l5.547,3.223c0.311,0.182,0.66,0.271,1.01,0.271 c0.347,0,0.693-0.089,1.003-0.268C32.633,59.376,33,58.745,33,58.043v-3.085c10.059-0.428,18.582-7.24,21.191-16.967 C57.411,37.888,60,35.244,60,32z M31,57.993l-5.538-3.218C25.045,54.533,25,54.152,25,54s0.045-0.533,0.461-0.775L31,49.957V57.993z M54,36c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S56.206,36,54,36z"/>
      <linearGradient id="IaTgA~1Np_BMY0IkWaeQ3d" x1="32" x2="32" y1="27.5" y2="36.538"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#6dc7ff"/>
        <stop offset="1" stopColor="#e6abff"/>
      </linearGradient>
      <path fill="url(#IaTgA~1Np_BMY0IkWaeQ3d)" d="M32 28A4 4 0 1 0 32 36A4 4 0 1 0 32 28Z"/>
    </svg>
  )
}

export const ServicesIcon: React.FC<Omit<IconProps, 'color'>> = ( { size = 25 } ) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size}>
      <linearGradient id="43RbhJKYusvovOdtfDO2Ja" x1="42" x2="42" y1="18.375" y2="28.25"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#6dc7ff"/>
        <stop offset="1" stopColor="#e6abff"/>
      </linearGradient>
      <path fill="url(#43RbhJKYusvovOdtfDO2Ja)" d="M42 19A4 4 0 1 0 42 27A4 4 0 1 0 42 19Z"/>
      <linearGradient id="43RbhJKYusvovOdtfDO2Jb" x1="32" x2="32" y1="6.375" y2="57.869"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#43RbhJKYusvovOdtfDO2Jb)"
            d="M55,20h-1.393c-0.286-1.061-0.749-2.078-1.336-3.029l1.042-1.043 c1.17-1.17,1.17-3.072,0-4.242s-3.072-1.17-4.242,0l-1.056,1.056c-0.943-0.577-1.956-1.036-3.015-1.336V10c0-1.654-1.346-3-3-3 s-3,1.346-3,3v1.406c-1.059,0.3-2.072,0.759-3.015,1.336l-1.056-1.056c-1.17-1.17-3.072-1.17-4.242,0 c-0.634,0.634-0.912,1.482-0.859,2.313H9c-1.654,0-3,1.346-3,3v34c0,1.302,0.838,2.402,2,2.816V55c0,1.103,0.897,2,2,2h29 c1.103,0,2-0.897,2-2v-1.184c1.162-0.414,2-1.514,2-2.816V38.816c1.162-0.414,2-1.514,2-2.816v-1.406 c1.059-0.3,2.072-0.759,3.015-1.336l1.056,1.056c0.585,0.585,1.353,0.877,2.121,0.877s1.536-0.292,2.121-0.877 c1.17-1.17,1.17-3.072,0-4.242l-1.042-1.043c0.588-0.951,1.051-1.968,1.336-3.029H55c1.654,0,3-1.346,3-3S56.654,20,55,20z M50.485,13.101c0.379-0.377,1.035-0.377,1.414,0c0.188,0.189,0.293,0.44,0.293,0.707s-0.104,0.518-0.293,0.707l-0.836,0.836 c-0.436-0.504-0.909-0.975-1.419-1.409L50.485,13.101z M32.101,13.101c0.379-0.377,1.035-0.377,1.414,0l0.842,0.841 c-0.51,0.434-0.983,0.905-1.419,1.409l-0.836-0.836c-0.188-0.189-0.293-0.44-0.293-0.707S31.912,13.29,32.101,13.101z M10,55v-1h29 v1H10z M40,52H9c-0.552,0-1-0.448-1-1V17c0-0.552,0.448-1,1-1h21.758l0.971,0.971c-0.588,0.951-1.051,1.967-1.337,3.029H29 c-1.654,0-3,1.346-3,3s1.346,3,3,3h1.393c0.286,1.061,0.749,2.078,1.337,3.029l-1.043,1.043c-1.17,1.17-1.17,3.072,0,4.242 c0.585,0.585,1.353,0.877,2.121,0.877s1.536-0.292,2.121-0.877l1.056-1.056c0.943,0.577,1.956,1.036,3.015,1.336V36 c0,1.302,0.838,2.402,2,2.816V51C41,51.552,40.552,52,40,52z M32.101,31.485l0.836-0.836c0.436,0.504,0.909,0.975,1.419,1.409 l-0.842,0.841c-0.379,0.377-1.035,0.377-1.414,0c-0.188-0.189-0.293-0.44-0.293-0.707S31.912,31.675,32.101,31.485z M51.899,31.485 c0.188,0.189,0.293,0.44,0.293,0.707s-0.104,0.518-0.293,0.707c-0.379,0.377-1.035,0.377-1.414,0l-0.842-0.841 c0.51-0.434,0.983-0.905,1.419-1.409L51.899,31.485z M55,24h-3.023l-0.15,0.819c-0.693,3.769-4.145,7.213-8.027,8.011L43,32.994V36 c0,0.552-0.448,1-1,1s-1-0.448-1-1v-3.006l-0.799-0.164c-3.883-0.798-7.334-4.242-8.027-8.011L32.023,24H29c-0.552,0-1-0.448-1-1 s0.448-1,1-1h3.023l0.15-0.819c0.693-3.769,4.145-7.213,8.027-8.011L41,13.006V10c0-0.552,0.448-1,1-1s1,0.448,1,1v3.006 l0.799,0.164c3.883,0.798,7.334,4.242,8.027,8.011L51.977,22H55c0.552,0,1,0.448,1,1S55.552,24,55,24z"/>
      <linearGradient id="43RbhJKYusvovOdtfDO2Jc" x1="42" x2="42" y1="6.375" y2="57.869"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#0d81ff"/>
        <stop offset="1" stopColor="#9610ff"/>
      </linearGradient>
      <path fill="url(#43RbhJKYusvovOdtfDO2Jc)"
            d="M42,15c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S46.411,15,42,15z M42,29 c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S45.309,29,42,29z"/>
      <linearGradient id="43RbhJKYusvovOdtfDO2Jd" x1="15" x2="15" y1="6.375" y2="57.869"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#43RbhJKYusvovOdtfDO2Jd)"
            d="M15,31c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S16.654,31,15,31z M15,35 c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S15.552,35,15,35z"/>
      <linearGradient id="43RbhJKYusvovOdtfDO2Je" x1="15" x2="15" y1="6.375" y2="57.869"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#43RbhJKYusvovOdtfDO2Je)"
            d="M15,23c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S16.654,23,15,23z M15,27 c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S15.552,27,15,27z"/>
      <linearGradient id="43RbhJKYusvovOdtfDO2Jf" x1="15" x2="15" y1="6.375" y2="57.869"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#43RbhJKYusvovOdtfDO2Jf)"
            d="M15,39c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S16.654,39,15,39z M15,43 c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S15.552,43,15,43z"/>
      <linearGradient id="43RbhJKYusvovOdtfDO2Jg" x1="22.5" x2="22.5" y1="6.375" y2="57.869"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#43RbhJKYusvovOdtfDO2Jg)" d="M20 27H25V29H20z"/>
      <linearGradient id="43RbhJKYusvovOdtfDO2Jh" x1="24" x2="24" y1="6.375" y2="57.869"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#43RbhJKYusvovOdtfDO2Jh)" d="M20 35H28V37H20z"/>
      <linearGradient id="43RbhJKYusvovOdtfDO2Ji" x1="28.5" x2="28.5" y1="6.375" y2="57.869"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#43RbhJKYusvovOdtfDO2Ji)" d="M20 43H37V45H20z"/>
      <linearGradient id="43RbhJKYusvovOdtfDO2Jj" x1="28.5" x2="28.5" y1="6.375" y2="57.869"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#43RbhJKYusvovOdtfDO2Jj)" d="M20 39H37V41H20z"/>
      <linearGradient id="43RbhJKYusvovOdtfDO2Jk" x1="24" x2="24" y1="6.375" y2="57.869"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#43RbhJKYusvovOdtfDO2Jk)" d="M20 31H28V33H20z"/>
      <linearGradient id="43RbhJKYusvovOdtfDO2Jl" x1="22.5" x2="22.5" y1="6.375" y2="57.869"
                      gradientUnits="userSpaceOnUse" spreadMethod="reflect">
        <stop offset="0" stopColor="#1a6dff"/>
        <stop offset="1" stopColor="#c822ff"/>
      </linearGradient>
      <path fill="url(#43RbhJKYusvovOdtfDO2Jl)" d="M20 24H25V26H20z"/>
    </svg>
  )
}