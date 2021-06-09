module.exports = {
  purge: ['~/**/*.vue'],
  theme: {
    opacity: {
      '0': '0',
      '25': '.25',
      '50': '.5',
      '75': '.75',
      '10': '.1',
      '20': '.2',
      '30': '.3',
      '40': '.4',
      '50': '.5',
      '60': '.6',
      '70': '.7',
      '80': '.8',
      '90': '.9',
      '100': '1',
    },
    colors: {
      green: '#10B981',
      danger: '#FF1010',
      black: '#222f3e',
      gray: '#D8D6D1',
      imgs: '#C4C4C4',
      disabled: '#F5F1F1',
      white: '#ffffff',
      blue: '#4267B2',
      orange: '#FF9933',
      redgoogle: '#DB4437'
    },
    fontSize: {
      '0': '0rem',
      xs: '0.75rem', // 12px
      sm: '.875rem', // 14px
      base: '1rem',
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '2rem', // 32px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem', // 48px
      '6xl': '4rem', // 64px
      '7xl': '5rem' // 80px
    },
    fontFamily: {
      sans: ['Noto Sans Thai UI', 'Noto Sans', 'sans-serif']
    },
    container: {
      center: true,
      padding: '1rem'
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      light: '#F7FAFC'
    }),
    borderColor: (theme) => ({
      ...theme('colors'),
      light: '#E0E0E0',
      lighter: '#E8E8E8'
    }),
    textColor: (theme) => ({
      ...theme('colors'),
      'white-50': 'rgba(255,255,255,0.5)'
    }),
    boxShadow: {
      xs: '0 0 0 1px rgba(238, 243, 244, 1)',
      sm: '0 1px 2px 0 rgba(238, 243, 244, 1)',
      md: '0 4px 6px -1px rgba(238, 243, 244, 1), 0 2px 4px -1px rgba(238, 243, 244, 1)',
      lg: '0 10px 15px -3px rgba(238, 243, 244, 1), 0 4px 6px -2px rgba(238, 243, 244, 1)',
      xl: '0 20px 25px -5px rgba(238, 243, 244, 1), 0 10px 10px -5px rgba(238, 243, 244, 1)'
    },
    extend: {
      spacing: {
        wide: '52.333%',
        xxl: '7.5rem', // 120px –  Deprecated, will be removed
        xl: '5rem', // 80px  –  Deprecated, will be removed
        lg: '2.5rem', // 40px  –  Deprecated, will be removed
        md: '1.5rem', // 24px  –  Deprecated, will be removed
        base: '1rem', // 16px  –  Deprecated, will be removed
        sm: '0.75rem', // 12px  –  Deprecated, will be removed
        xs: '0.5rem', // 8px   –  Deprecated, will be removed
        xxs: '0.25rem' // 4px   –  Deprecated, will be removed
      },
      borderRadius: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      }
    }
  },
  variants: {
    extend: {
      opacity: ['active'],
    }
  },
  corePlugins: {
    opacity: false,
  },
  plugins: []
}
