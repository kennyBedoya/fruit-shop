import { describe, it, expect, vi } from 'vitest'
import usersService from '@/services/users.service'
import api from '@/services/api'

vi.mock('@/services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
  },
}))

describe('users.service', () => {

  it('activates a user', async () => {

    api.patch.mockResolvedValue({
      data: {
        success: true,
        message: 'Usuario activado',
        data: {
          id_usuario: 12,
          activo: 1,
        },
      },
    })

    const result = await usersService.activateUser(12)

    expect(api.patch).toHaveBeenCalledWith(
      '/usuarios/12/activate'
    )

    expect(result).toEqual({
      success: true,
      message: 'Usuario activado',
      data: {
        id_usuario: 12,
        activo: 1,
      },
    })
  })

})