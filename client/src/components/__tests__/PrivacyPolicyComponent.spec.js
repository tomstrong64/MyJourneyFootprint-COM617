import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PrivacyPolicyComponent from '../PrivacyPolicyComponent.vue'

describe('PrivacyPolicyComponent', () => {
  it('loads privacy page when user clicks the privacy policy link', async () => {
    const wrapper = mount(PrivacyPolicyComponent)
    // Simulate a click on the privacy policy link
    await wrapper.find('#privacy-policy-link').trigger('click')

    // Assert that the navigation occurred and the privacy page is displayed
    expect(wrapper.vm.$route.path).toBe('/privacy-policy')
  })
})
