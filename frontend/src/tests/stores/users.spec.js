import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useUsersStore } from '@/stores/users'
import usersService from '@/services/users.service'

vi.mock('@/services/users.service', () => ({
  default: {
    getUsers: vi.fn(),
    getUser: vi.fn(),
    createUser: vi.fn(),
    updateUser: vi.fn(),
    deactivateUser: vi.fn(),
    activateUser: vi.fn(),
  },
}))

describe('Users Store', () => {

  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('activates a user and updates the state', async () => {

    const store = useUsersStore()

    store.users = [
      {
        id_usuario: 12,
        nombre: 'Juan',
        activo: 0,
      },
    ]

    usersService.activateUser.mockResolvedValue({
      success: true,
      data: {
        id_usuario: 12,
        nombre: 'Juan',
        activo: 1,
      },
    })

    await store.activateUser(12)

    expect(store.users[0].activo).toBe(1)

    expect(usersService.activateUser)
      .toHaveBeenCalledWith(12)
  })

})