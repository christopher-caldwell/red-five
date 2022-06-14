import { ChangeEvent, useCallback } from 'react'
import { useQueryClient } from 'react-query'

import { useMakConnectionActiveMutation } from '@/generated'

export const useMakeConnectionActive = (id: string) => {
  const queryClient = useQueryClient()
  const { mutate, ...mutation } = useMakConnectionActiveMutation({
    onSuccess() {
      queryClient.invalidateQueries()
    }
  })

  const makeConnectionActive = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.checked) return
      mutate({ id })
    },
    [mutate, id]
  )

  return { makeConnectionActive, ...mutation }
}
