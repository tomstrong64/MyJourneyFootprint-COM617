import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CarBySegmentComponent from '../CarBySegmentComponent.vue'

describe('CarBySegmentComponent', () => {
  it('displays UI warning when user clicks calculate with no segment', async () => {
    const wrapper = mount(CarBySegmentComponent)
    await wrapper.find('#calculate-button').trigger('click')
    expect(wrapper.find('#error-message1').text()).toContain('Please choose a segment')
  })

  it('displays UI warning when user clicks calculate with no class', async () => {
    const wrapper = mount(CarBySegmentComponent)
    await wrapper.setData({ selectedSegment: 'SUV' })  // Set a segment but leave class empty
    await wrapper.find('#calculate-button').trigger('click')
    expect(wrapper.find('#error-message2').text()).toContain('Please choose a class')
  })

  it('displays UI validation message when user chooses a segment and class', async () => {
    const wrapper = mount(CarBySegmentComponent)
    await wrapper.setData({ selectedSegment: 'SUV', selectedClass: 'Luxury' })
    await wrapper.find('#calculate-button').trigger('click')
    expect(wrapper.find('#success-message').text()).toContain('Calculation successful')
  })
})
