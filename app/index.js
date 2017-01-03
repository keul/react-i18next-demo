import 'babel-polyfill'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { I18nextProvider, translate } from 'react-i18next'
import i18n from './i18n' // initialized i18next instance


@translate(['common', 'app'], { wait: true })
class App extends Component {
  render() {
    const { t } = this.props
    return (
      <div className={ t('app:key2') }>
        { t('app:key1', {lng: 'fr'}) }
        <div>{ t('common1', {lng: 'fr'}) }</div>
        <strong>{ t('common5', { value: new Date() }) }</strong>
        <center>{ t('foo.bar', {defaultValue: 'FoO bAr'}) + ' ' + t('foo.baz') }</center>
      </div>
    )
  }
}


ReactDOM.render(
  <I18nextProvider i18n={ i18n }><App /></I18nextProvider>,
  document.getElementById('app')
)
