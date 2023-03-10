import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface State {
  title: string | null
}

interface Actions {
  setTitle: (newTitle: string) => void
  setClearTitle: () => void
}

export const useTitle = create<State & Actions>()(
  devtools(
    (set) => ({
      title: null,
      setTitle: (newTitle: string) => {
        set((state) => ({
          title: newTitle,
        }))
      },
      setClearTitle: () => {
        set(() => ({
          title: null,
        }))
      },
    }),
    {
      name: 'title',
      enabled: true,
      anonymousActionType: 'TitleAction',
      serialize: {
        options: true,
      },
    },
  ),
)
