export interface NavLink {
  name: string
  href: string
}

export const NAV_LINKS: NavLink[] = [
  { name: 'Work', href: '/projects' },
  { name: 'Experience', href: '/experience' },
  { name: 'About', href: '/about-me' },
  { name: 'Writing', href: '/blogs' },
]

export const FOOTER_LINKS: NavLink[] = [
  ...NAV_LINKS,
  { name: 'Certificates', href: '/certificates' },
  { name: 'Contact', href: '/#contact' },
]

export const THEME_STORAGE_KEY = 'theme'

// Sent to Umami when a home section is 75% visible.
export const TRACKED_HOME_SECTIONS = ['hero', 'snapshot', 'capabilities', 'work', 'now', 'experience', 'approach', 'expertise', 'writing', 'credentials', 'contact']

export const BLUR_IMAGE_DATA = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/Ao3R8f+10eH/3dfV//Pi2//z6uv/3ePz/7vR8f+ZvOj/Aizr5wAd6N0AEeTOAAjhxAAH4MkACuTVAAro3QAM7OEAAhvg5QAN4ecA/9/nAPna5gD11uUA89nmAPLj6wDw7vIAAgTf8gD65wMA7eoZAObmIgDj4BkA4eEQAN7tCwDU+wsAAAAA//9Bn+RaAAAABklEQVQDADStTaprX7EVAAAAAElFTkSuQmCC"
