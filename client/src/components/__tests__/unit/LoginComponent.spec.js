import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginComponent from '../LoginComponent.vue'

describe('LoginComponent', () => {
  it('displays UI warning when user clicks login with no details', async () => {
    const wrapper = mount(LoginComponent)
    await wrapper.find('#loginbutton').trigger('click')
    expect(wrapper.find('#error-message1').text()).toContain('Please fill in all details')
  })

  it('displays UI warning when user clicks login with no username', async () => {
    const wrapper = mount(LoginComponent)
    await wrapper.find('#loginbutton').trigger('click')
    expect(wrapper.find('#error-message2').text()).toContain('Username is required')
  })

  it('displays UI warning when user clicks login with no password', async () => {
    const wrapper = mount(LoginComponent)
    await wrapper.find('#loginbutton').trigger('click')
    expect(wrapper.find('#error-message3').text()).toContain('Password is required')
  })

  it('handles 401 response when user clicks login with incorrect username or password', async () => {
    // Mock an API call that returns a 401 response for incorrect credentials
    const mockApi = {
      //   post: async (url, data) => {
      //    if (data.username === 'incorrectUser' || data.password === 'incorrectPassword') {
      //      throw new Error('Username or password incorrect')
      //  }
      // Mock a successful login
      //  return { status: 200 }
      //   }
    }

    const wrapper = mount(LoginComponent, {
      global: {
        mocks: {
          $http: mockApi
        }
      }
    })

    await wrapper.setData({ username: 'incorrectUser', password: 'incorrectPassword' })
    await wrapper.find('#loginbutton').trigger('click')

    // Assert that the component handles the 401 error and shows the correct UI warning
    expect(wrapper.find('#error-message4').text()).toContain('Username or password incorrect')
  })

  it('handles 200 response when user clicks login with correct details and checkbox selected', async () => {
    // Mock an API call that returns a successful login response
    const mockApi = {
      //   post: async (url, data) => {
      // Mock a successful login
      //   if (data.username === 'validUser' && data.password === 'validPassword') {
      //   return { status: 200 }
      //  }
      // }
    }

    const wrapper = mount(LoginComponent, {
      global: {
        mocks: {
          $http: mockApi
        }
      }
    })

    await wrapper.setData({
      username: 'validUser',
      password: 'validPassword',
      checkboxChecked: true
    })
    await wrapper.find('#loginbutton').trigger('click')

    // Assert that the component handles the 200 response appropriately
    // For example, you might want to set a cookie or emit a success event
    expect(wrapper.text()).toContain('Login successful')
  })
  
  it('navigates to the register page when user clicks the register link', async () => {
    const wrapper = mount(LoginComponent)
    // Simulate a click on the register link
    await wrapper.find('#register-link').trigger('click')

    // Assert that the navigation occurred and the register page is displayed
    expect(wrapper.vm.$route.path).toBe('/register')
  })
})
