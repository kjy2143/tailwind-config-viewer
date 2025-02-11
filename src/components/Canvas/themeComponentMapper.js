/**
 * Maps Canvas components to theme prop in TW config
 */
export default function themeComponentMapper (theme) {
  return [
    {
      themeKey: 'backgroundColor',
      component: 'Colors',
      title: 'Colors',
      data: {
        backgroundColor: theme.backgroundColor,
        borderColor: theme.borderColor,
        textColor: theme.textColor
      }
    },
    {
      themeKey: 'opacity',
      component: 'Opacity',
      title: 'Opacity',
      data: theme.opacity
    },
    {
      themeKey: 'boxShadow',
      component: 'Shadows',
      title: 'Shadows',
      data: theme.boxShadow
    },
    {
      themeKey: 'spacing',
      component: 'Spacing',
      title: 'Spacing',
      data: theme.spacing
    },
    {
      themeKey: 'fontSize',
      component: 'FontSizes',
      title: 'Font Sizes',
      data: {
        fontSize: theme.fontSize,
        typographyExample: theme.configViewer.typographyExample
      }
    },
    {
      themeKey: 'fontFamily',
      component: 'FontFamilies',
      title: 'Font Families',
      data: {
        fontFamily: theme.fontFamily,
        typographyExample: theme.configViewer.typographyExample
      }
    },
    {
      themeKey: 'fontWeight',
      component: 'FontWeight',
      title: 'Font Weight',
      data: {
        fontWeight: theme.fontWeight,
        typographyExample: theme.configViewer.typographyExample
      }
    },
    {
      themeKey: 'letterSpacing',
      component: 'LetterSpacing',
      title: 'Letter Spacing',
      data: {
        letterSpacing: theme.letterSpacing,
        typographyExample: theme.configViewer.typographyExample
      }
    },
    {
      themeKey: 'lineHeight',
      component: 'LineHeight',
      title: 'Line Height',
      data: {
        lineHeight: theme.lineHeight,
        typographyExample: theme.configViewer.typographyExample
      }
    },
    {
      themeKey: 'borderRadius',
      component: 'BorderRadius',
      title: 'Border Radius',
      data: theme.borderRadius
    },
    {
      themeKey: 'borderWidth',
      component: 'BorderWidth',
      title: 'Border Width',
      data: theme.borderWidth
    },
    {
      themeKey: 'width',
      component: 'Width',
      title: 'Width',
      data: theme.width
    },
    {
      themeKey: 'minWidth',
      component: 'MinWidth',
      title: 'Min Width',
      data: theme.minWidth
    },
    {
      themeKey: 'maxWidth',
      component: 'MaxWidth',
      title: 'Max Width',
      data: theme.maxWidth
    },
    {
      themeKey: 'height',
      component: 'Height',
      title: 'Height',
      data: theme.height
    },
    {
      themeKey: 'minHeight',
      component: 'MinHeight',
      title: 'Min Height',
      data: theme.minHeight
    },
    {
      themeKey: 'maxHeight',
      component: 'MaxHeight',
      title: 'Max Height',
      data: theme.maxHeight
    },
    {
      themeKey: 'screens',
      component: 'Screens',
      title: 'Breakpoints',
      data: theme.screens
    },
    {
      themeKey: 'transitionTimingFunction',
      component: 'Transitions',
      title: 'Transitions',
      data: {
        timing: theme.transitionTimingFunction,
        duration: theme.transitionDuration,
        delay: theme.transitionDelay
      }
    }
  ].filter(({ themeKey }) => theme[themeKey])
}
