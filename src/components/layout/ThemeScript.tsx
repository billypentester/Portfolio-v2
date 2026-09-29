import { THEME_STORAGE_KEY } from '@/src/lib/constants'

// Runs before first paint so a stored preference never flashes the wrong theme.
const script = `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
