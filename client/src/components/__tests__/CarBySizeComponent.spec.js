import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CarBySizeComponent from '../CarBySizeComponent.vue'

describe('CarBySizeComponent', () => {
  it('displays UI warning when user clicks calculate with no type', async () => {
    const wrapper = mount(CarBySizeComponent)
    await wrapper.find('#calculate-button').trigger('click')
    expect(wrapper.find('#error-message1').text()).toContain('Please choose a type')
  })

  it('displays UI warning when user clicks calculate with no class', async () => {
    const wrapper = mount(CarBySizeComponent)
    await wrapper.setData({ selectedType: 'Compact' })  // Set a type but leave class empty
    await wrapper.find('#calculate-button').trigger('click')
    expect(wrapper.find('#error-message2').text()).toContain('Please choose a class')
  })

  it('displays UI validation message when user chooses a type and class', async () => {
    const wrapper = mount(CarBySizeComponent)
    await wrapper.setData({ selectedType: 'Compact', selectedClass: 'Mid-Size' })
    await wrapper.find('#calculate-button').trigger('click')
    expect(wrapper.find('#success-message').text()).toContain('Calculation successful')
  })
})
