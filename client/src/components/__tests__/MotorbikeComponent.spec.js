import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MotorbikeComponent from '../MotorbikeComponent.vue'

describe('MotorbikeComponent', () => {
  it('displays UI warning when user clicks calculate with no type', async () => {
    const wrapper = mount(MotorbikeComponent)
    await wrapper.find('#calculate-button').trigger('click')
    expect(wrapper.find('#error-message1').text()).toContain('Please choose a type')
  })

  it('displays UI validation message when user chooses a type', async () => {
    const wrapper = mount(MotorbikeComponent)
    await wrapper.setData({ selectedType: 'Sport' })
    await wrapper.find('#calculate-button').trigger('click')
    expect(wrapper.find('#success-message').text()).toContain('Calculation successful')
  })
})
