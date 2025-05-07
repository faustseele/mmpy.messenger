import { getAuthPage } from './auth/auth.tmpl.js'
import { getChatPage } from './chat/chat.tmpl.js'
import { getProfilePage } from './profile/profile.tmpl.js'
import { getErrorPage } from './errors/errors.tmpl.js'
import { pageAddresses } from './data.js'

export function getPage (link) {
  if (!pageAddresses.includes(link)) {
    console.error('Bad link:', link)
    return getErrorPage('/404')
  }

  switch (link) {
    case '/sign-up':
      return getAuthPage(link)
    case '/sign-in':
      return getAuthPage(link)
    case '/chats':
      return getChatPage()
    case '/profile':
      return getProfilePage()
    case '/404':
      return getErrorPage(link)
    case '/500':
      return getErrorPage(link)
    default:
      console.error('Bad link:', link)
      return getErrorPage('/404')
  }
}
