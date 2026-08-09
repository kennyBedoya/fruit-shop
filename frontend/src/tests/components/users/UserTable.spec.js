import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserTable from '@/components/users/UserTable.vue'

describe('UserTable', () => {

  it('renders users correctly', () => {

    const users = [
      {
        id_usuario: 1,
        nombre: 'Juan',
        apellidos: 'Pérez',
        correo: 'juan@test.com',
        activo: 1,
      },
      {
        id_usuario: 2,
        nombre: 'Ana',
        apellidos: 'Gómez',
        correo: 'ana@test.com',
        activo: 0,
      },
    ]

    const wrapper = mount(UserTable, {
      props: {
        users,
        loading: false,
      },
    })

    expect(wrapper.text()).toContain('Juan')
    expect(wrapper.text()).toContain('Ana')
  })


  
  it('emits deactivate event for active user', async () => {

  const users = [
    {
      id_usuario: 1,
      nombre: 'Juan',
      apellidos: 'Pérez',
      correo: 'juan@test.com',
      activo: 1,
    },
  ]

  const wrapper = mount(UserTable, {
    props: {
      users,
      loading: false,
    },
  })

  const button = wrapper
  .findAll('button')
  .find(button => button.text() === 'Desactivar')

await button.trigger('click')

  expect(wrapper.emitted('deactivate')).toBeTruthy()

  expect(wrapper.emitted('deactivate')[0]).toEqual([
    users[0],
  ])
})

})