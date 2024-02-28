import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmissionCalculationComponent from '../EmissionCalculationComponent.vue'

describe('EmissionCalculationComponent', () => {
  it('displays UI warning when user clicks calculate without starting point', async () => {
    const wrapper = mount(EmissionCalculationComponent)
    await wrapper.find('#calculate-button').trigger('click')
    expect(wrapper.find('#error-message1').text()).toContain('Please provide a starting point')
  })

  it('displays UI warning when user clicks calculate without end point', async () => {
    const wrapper = mount(EmissionCalculationComponent)
    await wrapper.setData({ startPoint: 'LocationA' })
    await wrapper.find('#calculate-button').trigger('click')
    expect(wrapper.find('#error-message2').text()).toContain('Please provide an end point')
  })

  it('displays UI warning when user clicks calculate with no details', async () => {
    const wrapper = mount(EmissionCalculationComponent)
    await wrapper.find('#calculate-button').trigger('click')
    expect(wrapper.find('#error-message3').text()).toContain(
      'Please provide starting and ending points'
    )
  })

  it('displays UI warning when user clicks calculate with no mode selected', async () => {
    const wrapper = mount(EmissionCalculationComponent)
    await wrapper.setData({ startPoint: 'LocationA', endPoint: 'LocationB' })
    await wrapper.find('#calculate-button').trigger('click')
    expect(wrapper.find('#error-message4').text()).toContain('Please select a transportation mode')
  })

  it('displays UI validation for input number of people', async () => {
    const wrapper = mount(EmissionCalculationComponent)
    await wrapper.setData({
      startPoint: 'LocationA',
      endPoint: 'LocationB',
      transportationMode: 'Car',
      numberOfPeople: 3
    })
    expect(wrapper.find('#people-input').element.value).toBe('3')
  })

  it('displays UI warning when user inputs number of people less than 1', async () => {
    const wrapper = mount(EmissionCalculationComponent)
    await wrapper.setData({
      startPoint: 'LocationA',
      endPoint: 'LocationB',
      transportationMode: 'Car',
      numberOfPeople: 0
    })
    await wrapper.find('#calculate-button').trigger('click')
    expect(wrapper.find('#error-message5').text()).toContain('Number of people must be 1 or more')
  })

  it('displays UI warning when user clicks calculate with no people', async () => {
    const wrapper = mount(EmissionCalculationComponent)
    await wrapper.setData({
      startPoint: 'LocationA',
      endPoint: 'LocationB',
      transportationMode: 'Car'
    })
    await wrapper.find('#calculate-button').trigger('click')
    expect(wrapper.find('#error-message6').text()).toContain('Please provide the number of people')
  })

  it('handles 201 response when user clicks calculate with valid inputs', async () => {
    const mockApi = {
    //  post: async (url, data) => {
        // Mock a successful emission calculation response
    //    return { status: 201, data: { calculatedValue: 50 } }
    //  }
    }

    const wrapper = mount(EmissionCalculationComponent, {
      global: {
        mocks: {
          $http: mockApi
        }
      }
    })

    await wrapper.setData({
      startPoint: 'LocationA',
      endPoint: 'LocationB',
      transportationMode: 'Car',
      numberOfPeople: 2
    })

    await wrapper.find('#calculate-button').trigger('click')

    // Assert that the component handles the 201 response appropriately
    expect(wrapper.text()).toContain('Emission calculated successfully. Value: 50')
  })

  it('toggles metrics to KM', async () => {
    const wrapper = mount(EmissionCalculationComponent)
    await wrapper.setData({ metrics: 'miles' })
    await wrapper.find('#toggle-metrics-button').trigger('click')
    expect(wrapper.vm.metrics).toBe('km')
  })

  it('toggles metrics to miles', async () => {
    const wrapper = mount(EmissionCalculationComponent)
    await wrapper.setData({ metrics: 'km' })
    await wrapper.find('#toggle-metrics-button').trigger('click')
    expect(wrapper.vm.metrics).toBe('miles')
  })

  it('sets starting point to user location on "use my location" button click with active permissions', async () => {
    // Mock the geolocation API for successful response
 //   const mockGeolocation = {
  //    getCurrentPosition: (successCallback, errorCallback) => {
     //   const position = {
      //    coords: {
         //   latitude: 37.7749,
        //    longitude: -122.4194
       //   }
      //  }
       // successCallback(position)
    //  }
  //  }

 //   global.navigator.geolocation = mockGeolocation

  //  const wrapper = mount(EmissionCalculationComponent)
  //  await wrapper.find('#use-location-button').trigger('click')

   // expect(wrapper.vm.startPoint).toBe('User Location')
  })

  it('prompts user for location permissions on "use my location" button click with inactive permissions', async () => {
    // Mock the geolocation API for unsuccessful response (no permissions)
  //  const mockGeolocation = {
   //   getCurrentPosition: (successCallback, errorCallback) => {
     //   const error = { code: 1, message: 'Permission denied' }
    //    errorCallback(error)
    //  }
   // }

   // global.navigator.geolocation = mockGeolocation

    const wrapper = mount(EmissionCalculationComponent)
    await wrapper.find('#use-location-button').trigger('click')

    expect(wrapper.text()).toContain('Please enable location permissions')
  })

  it('sets starting point to user location on "use my location" button click after user grants permissions', async () => {
    // Mock the geolocation API for successful response
  //  const mockGeolocation = {
   //   getCurrentPosition: (successCallback, errorCallback) => {
    //    const position = {
      //    coords: {
      //      latitude: 37.7749,
         //   longitude: -122.4194
        //  }
      //  }
      //  successCallback(position)
     // }
//    }

  //  global.navigator.geolocation = mockGeolocation

    const wrapper = mount(EmissionCalculationComponent)
    await wrapper.find('#use-location-button').trigger('click')

    // Mock user granting permissions after clicking the button
  //  global.navigator.permissions = {
   //   query: async () => ({
      //  state: 'granted'
      })
   // }

   // await wrapper.find('#use-location-button').trigger('click')

 //   expect(wrapper.vm.startPoint).toBe('User Location')
  })

  it('displays UI warning when user denies location permissions on "use my location" button click', async () => {
    // Mock the geolocation API for unsuccessful response (user denies permissions)
 //   const mockGeolocation = {
   //   getCurrentPosition: (successCallback, errorCallback) => {
   //     const error = { code: 1, message: 'Permission denied' }
     //   errorCallback(error)
     // }
 //   }

  //  global.navigator.geolocation = mockGeolocation

  //  const wrapper = mount(EmissionCalculationComponent)
   // await wrapper.find('#use-location-button').trigger('click')

    // Mock user denying permissions after clicking the button
  //  global.navigator.permissions = {
   //   query: async () => ({
   //     state: 'denied'
  //    })
   // }

   // await wrapper.find('#use-location-button').trigger('click')

   // expect(wrapper.text()).toContain('Please enable location permissions')
 // })
// 
})
