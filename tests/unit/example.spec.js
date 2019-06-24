import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Home from '../../src/components/home'

describe('home.vue tests', () => {
  it('should render the template', () => {
  
    const wrapper = shallowMount(Home)
    const meetups = wrapper.find('div').text();
    expect(meetups).to('assdfadf')

  
  })
})
