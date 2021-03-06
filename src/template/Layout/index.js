import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Layout extends Component {
  
  static device = [ // 屏幕适配,高阶函数。@params {React.Component}
    'mobile',
    'tablet',
    'tablet-only',
    'touch',
    'desktop',
    'desktop-only',
    'widescreen',
    'widescreen-only',
    'fullhd',
  ].reduce((acc, device, index, suffixes) => ({
    ...acc,
    [device.replace(/-*(\b\w)/g, (_, letter) => letter.toUpperCase())] ({type, props = {}}) {
      return React.cloneElement(arguments[0],
        {
          className: classNames(props.className, ...suffixes.map(suffix => suffix !== device && `is-hidden-${suffix}`/* :is-block-${device} */)),
        })
    },
  }), {})

  static Header ({className, ...otherProps}) {
    return (
      // Hero content: will be in the top
      <header className={classNames('hero-head', className)} {...otherProps}/>
    )
  }

  static Content ({className, ...otherProps}) {
    return (
      // Hero content: will be in the middle
      <div className={classNames('hero-body', className)} {...otherProps}/>
    )
  }

  static Footer ({className, ...otherProps}) {
    return (
      // Hero footer: will stick at the bottom
      <footer className={classNames('hero-foot', className)} {...otherProps}/>
    )
  }

  static Container ({className, ...otherProps}) {
    return (
      // A simple container to center your content horizontally
      <div className={classNames('container', className)} {...otherProps}/>
    )
  }

  render () {
    const {size/*medium|large|fullheight*/, bold, color, className: newClassName, ...otherProps} = this.props
    const className = classNames('hero', newClassName, {
      [`is-${size}`]: size,
      [`is-${color}`]: color,
      'is-bold': bold,
    })

    delete otherProps.computedMatch

    return (
      <section className={className} {...otherProps}/>
    )
  }
}

export { default as Level } from './Level'
export { default as Media } from './Media'
export { default as Footer } from './Footer'

Layout.propTypes = {
  size: PropTypes.oneOf(['medium', 'large', 'fullheight']),
  bold: PropTypes.bool,
  color: PropTypes.string,
  className: PropTypes.string,
}

Layout.Header.propTypes = Layout.Content.propTypes = Layout.Footer.propTypes = Layout.Container.propTypes = {
  className: PropTypes.string,
}
