import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AuthComponent from '../AuthComponent.vue'

describe('AuthComponent', () => {
  it('redirects to emissions page when JWT cookie is not present', async () => {
    const wrapper = mount(AuthComponent, {
      global: {
        mocks: {
          $cookie: {
            get: () => null // Simulate JWT cookie not being present
          }
        }
      }
    })

    // Wait for any asynchronous operations to complete
    await wrapper.vm.$nextTick()

    // Assert that the navigation occurred and the emissions page is displayed
    expect(wrapper.vm.$route.path).toBe('/emissions')
  })

  it('displays username when JWT cookie is present and /graphql request is successful', async () => {
    const mockUsername = 'testuser'
    const wrapper = mount(AuthComponent, {
      global: {
        mocks: {
          $cookie: {
            get: () => 'mockJWT' // Simulate JWT cookie being present
          },
          $http: {
            post: async (url, data) => {
              // Simulate a successful /graphql request
              if (url === '/graphql' && data.query === 'query { username }') {
                return { status: 200, data: { data: { username: mockUsername } } }
              }
              throw new Error('Unexpected request')
            }
          }
        }
      }
    })

    // Wait for any asynchronous operations to complete
    await wrapper.vm.$nextTick()

    // Assert that the username is displayed in the top right
    expect(wrapper.find('#username-display').text()).toContain(mockUsername)
  })

  it('displays login and register links when JWT cookie is not present', async () => {
    const wrapper = mount(AuthComponent, {
      global: {
        mocks: {
          $cookie: {
            get: () => null // Simulate JWT cookie not being present
          }
        }
      }
    })

    // Wait for any asynchronous operations to complete
    await wrapper.vm.$nextTick()

    // Assert that login and register links are present in the top right
    expect(wrapper.find('#login-link').exists()).toBe(true)
    expect(wrapper.find('#register-link').exists()).toBe(true)
  })
})
