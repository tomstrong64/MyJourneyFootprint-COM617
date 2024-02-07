import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InfoComponent from '../InfoComponent.vue'

describe('InfoComponent', () => {
  it('loads info page when user clicks the info link', async () => {
    const wrapper = mount(InfoComponent)
    // Simulate a click on the info link
    await wrapper.find('#info-link').trigger('click')

    // Assert that the navigation occurred and the info page is displayed
    expect(wrapper.vm.$route.path).toBe('/info')
  })
})
