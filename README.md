# React Masonify

A lightweight React component library for creating responsive Masonry layouts.
<br/>

<div>
  
![NPM Version](https://img.shields.io/npm/v/react-masonify)
![NPM Downloads](https://img.shields.io/npm/dw/react-masonify)
![NPM Downloads](https://img.shields.io/npm/dm/react-masonify)
[![License](https://badgen.net/badge/License/MIT/blue)]([https://github.com/juliencrn/usehooks-ts/blob/master/LICENSE](https://github.com/thepuskar/react-masonify/blob/main/LICENSE.md))
![npm bundle size](https://img.shields.io/bundlephobia/minzip/%20react-masonify)
  
</div>


## Installation

```bash
npm install react-masonify
# or
yarn add react-masonify
```

## Features

- 🎯 Responsive grid layouts
- 🪶 Lightweight implementation
- ⚡ Performance optimized
- 🔄 Dynamic column redistribution
- 📱 Breakpoint-based responsiveness
- 🎨 Customizable gaps and styling

Check out the [Live Example](https://stackblitz.com/edit/react-masonify-demo?file=src%2FApp.jsx) to try it yourself.

## Components

### `ResponsiveMasonry`

A wrapper component that handles responsive behaviour based on screen width breakpoints.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columnsCountBreakPoints` | `{ [key: number]: number }` | `{ 350: 1, 750: 2, 900: 3 }` | Object defining breakpoints and their corresponding column counts |
| `children` | `React.ReactNode` | Required | Should be a `Masonry` component |
| `className` | `string \| null` | `null` | Optional CSS class name |
| `style` | `CSSProperties \| null` | `null` | Optional inline styles |

### `Masonry`

The core component that creates the masonry layout.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | Required | Items to be arranged in the masonry layout |
| `columnsCount` | `number` | `3` | Number of columns (automatically set when used with ResponsiveMasonry) |
| `gap` | `string` | `"0"` | Gap between items (CSS value) |
| `className` | `string \| null` | `null` | Optional CSS class name |
| `style` | `React.CSSProperties` | `{}` | Optional inline styles |
| `containerTag` | `keyof JSX.IntrinsicElements` | `"div"` | HTML tag for the container element |
| `itemTag` | `keyof JSX.IntrinsicElements` | `"div"` | HTML tag for the items |
| `itemStyle` | `React.CSSProperties` | `{}` | Styles applied to each item container |
| `sequential` | `boolean` | `false` | If true, items are arranged sequentially instead of by height |

## Basic Usage

```tsx
import { Masonry, ResponsiveMasonry } from 'react-masonify';

const Gallery = () => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
    >
      <Masonry gap="1rem">
        {images.map((src) => (
          <img src={src} key={src} alt="" />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};
```

## Advanced Usage

### Custom Breakpoints

```tsx
const CustomGallery = () => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{
        320: 1,  // 1 column for viewport width >= 320px
        480: 2,  // 2 columns for viewport width >= 480px
        720: 3,  // 3 columns for viewport width >= 720px
        1024: 4, // 4 columns for viewport width >= 1024px
      }}
    >
      <Masonry gap="1.5rem" itemTag="section">
        {items.map((item) => (
          <div key={item.id}>
            {/* Your content */}
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};
```

### Custom Styling

```tsx
const StyledGallery = () => {
  return (
    <ResponsiveMasonry
      style={{ padding: '20px' }}
      className="gallery-container"
    >
      <Masonry
        gap="2rem"
        itemStyle={{
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          padding: '10px'
        }}
        style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {items.map((item) => (
          <div key={item.id}>
            {/* Your content */}
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};
```

## How It Works

1. `ResponsiveMasonry` monitors the window width and determines the appropriate number of columns based on the provided breakpoints.

2. `Masonry` distributes children across columns using one of two strategies:
   - Default (sequential=false): Distributes items based on their heights to maintain balanced columns
   - Sequential (sequential=true): Distributes items sequentially from left to right

3. The layout automatically updates when:
   - The window is resized
   - Children are added or removed
   - The columns count changes

## Browser Support

React Masonify works in all modern browsers that support [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox):
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## TypeScript Support

React Masonify is written in TypeScript and includes built-in type definitions.

## Performance Considerations

- Use the `key` prop with unique values for each child to ensure proper updates
- Avoid frequent changes to `columnsCount` or `gap` props
- Consider using `sequential={true}` for simpler layouts or when performance is crucial
- Use appropriate image sizes to prevent layout shifts

## License

This project is [MIT](https://github.com/thepuskar/react-masonify/blob/main/LICENSE.md) licensed.
