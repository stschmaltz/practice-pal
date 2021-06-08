interface Route {
  title: string
  link: string
  icon: string
}

const routes: Route[] = [
  { title: 'Tools', link: '/tools', icon: '../metronome-icon.svg' },
  // { title: 'test2', link: '/test2' },
]

export { routes, Route }
