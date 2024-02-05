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

  it('opens privacy page on clicking privacy policy link', async () => {
    const wrapper = mount(LoginComponent)
    await wrapper.find('#privacy-link').trigger('click')
    // Assert that the privacy page is opened (could check the route, modal visibility, etc.)
    // This is a simplified example
    expect(wrapper.text()).toContain('Privacy Policy Page')
  })

  it('handles 200 response when user clicks checkbox on privacy page', async () => {
    // Mock an API call that returns a successful response for checkbox click
    const mockApi = {
      // Assume there's a method in the component to handle checkbox click
      post: async (url, data) => {
        if (data.checkboxClicked) {
          return { status: 200 }
        }
      }
    }

    const wrapper = mount(LoginComponent, {
      global: {
        mocks: {
          $http: mockApi
        }
      }
    })

    // Assume there's a method in the component to handle checkbox click
    await wrapper.vm.handleCheckboxClick()

    // Assert that the component handles the 200 response appropriately
    expect(wrapper.text()).toContain('Checkbox clicked successfully')
  })

  it('displays UI warning when user clicks login without checking the box', async () => {
    const wrapper = mount(LoginComponent)
    await wrapper.setData({ username: 'testuser', password: 'test' })
    await wrapper.find('#loginbutton').trigger('click')
    expect(wrapper.find('#error-message5').text()).toContain('Please accept the privacy policy')
  })
})
