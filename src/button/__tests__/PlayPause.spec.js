import React from 'react'
import PlayPause from '../PlayPause'
import { mount } from 'enzyme'
import { Icon } from 'react-fa'

describe('<PlayPause />', () => {
  it('should render pause button', () => {
    const wrapper = mount(<PlayPause isPlaying />)
    expect(wrapper.find(Icon).props().name).toBe('pause')
  })

  it('should render play button', () => {
    const wrapper = mount(<PlayPause isPlaying={false} />)
    expect(wrapper.find(Icon).props().name).toBe('play')
  })
})
