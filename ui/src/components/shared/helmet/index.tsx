import { FC } from 'react'
import { Helmet as ReactHelmet } from 'react-helmet-async'

export const Helmet: FC<Props> = ({ title, children }) => {
  return (
    <ReactHelmet>
      <title>{title ? `${title} |` : null} Redis Commander</title>
      {children || null}
    </ReactHelmet>
  )
}

interface Props {
  title?: string
}
