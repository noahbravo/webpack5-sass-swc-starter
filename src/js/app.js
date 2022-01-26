import 'normalize.css/normalize.css'
import '../scss/style.scss'
import { onDocumentReady, importAll } from './functions.js'

// import all html files from pages
importAll(require.context('../pages', true, /\.html/))

// import all media from public
importAll(
  require.context(
    '../../public',
    true,
    /\.(png|svg|jpg|jpe?g|gif|mov|mp4|ico|webmanifest|xml)$/
  )
)

onDocumentReady(function () {
  console.log('hello friend.')
})
