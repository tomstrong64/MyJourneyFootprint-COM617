import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import RegistrationComponent from '../RegistrationComponent.vue'

describe('RegistrationComponent', () => {
  it('displays UI warning when user clicks register with no details', async () => {
    const wrapper = mount(RegistrationComponent)
    await wrapper.find('#registerbutton').trigger('click')
    // Assert that UI warning is displayed
    expect(wrapper.find('#error-message1').text()).toContain('Please fill in all details')
  })

  it('displays UI warning when user clicks register with no username', async () => {
    const wrapper = mount(RegistrationComponent)
    // Set other details but leave username empty
    await wrapper.find('#registerbutton').trigger('click')
    // Assert that UI warning is displayed
    expect(wrapper.find('#error-message2').text()).toContain('Username is required')
  })

  it('displays UI warning when user clicks register with no password', async () => {
    const wrapper = mount(RegistrationComponent)
    // Set other details but leave password empty
    await wrapper.find('#registerbutton').trigger('click')
    // Assert that UI warning is displayed
    expect(wrapper.find('#error-message3').text()).toContain('Password is required')
  })

  it('handles 401 response when user clicks register with already used username', async () => {
    // Mock an API call that returns a 401 response for duplicate username
    const mockApi = {
      post: async (url, data) => {
        if (data.username === 'existingUser') {
          throw new Error('Username already taken')
        }
        // Mock a successful registration
        return { status: 201 }
      }
    }

    const wrapper = mount(RegistrationComponent, {
      global: {
        mocks: {
          $http: mockApi
        }
      }
    })

    await wrapper.setData({ username: 'existingUser', password: 'test', checkboxChecked: true })
    await wrapper.find('#registerbutton').trigger('click')

    // Assert that the component handles the 401 error and shows the correct UI warning
    expect(wrapper.find('#error-message6').text()).toContain('Username already taken')
  })

  it('handles 201 response when user clicks register with valid details and checkbox selected', async () => {
    // Mock an API call that returns a successful registration response
    const mockApi = {
      //  post: async (url, data) => {
      // Mock a successful registration
      //    return { status: 201 }
      // }
    }

    const wrapper = mount(RegistrationComponent, {
      global: {
        mocks: {
          $http: mockApi
        }
      }
    })

    await wrapper.setData({ username: 'newUser', password: 'test', checkboxChecked: true })
    await wrapper.find('#registerbutton').trigger('click')

    expect(wrapper.text()).toContain('Registration successful')
  })
  it('displays UI warning when user clicks register without checking the box', async () => {
    const wrapper = mount(RegistrationComponent)
    await wrapper.setData({ username: 'testuser', password: 'test' })
    await wrapper.find('#registerbutton').trigger('click')
    expect(wrapper.find('#error-message4').text()).toContain('Please accept the privacy policy')
  })

  it('displays UI warning when user clicks register with invalid character limits', async () => {
    const wrapper = mount(RegistrationComponent)
    await wrapper.setData({ username: 'short', password: 'short', checkboxChecked: true })
    await wrapper.find('#registerbutton').trigger('click')
    expect(wrapper.find('#error-message5').text()).toContain(
      'Username and password must meet minimum character limits'
    )
  })

  it('navigates to the login page when user clicks the login link', async () => {
    const wrapper = mount(RegistrationComponent)
    // Simulate a click on the login link
    await wrapper.find('#login-link').trigger('click')

    // Assert that the navigation occurred and the login page is displayed
    expect(wrapper.vm.$route.path).toBe('/login')
  })
})
