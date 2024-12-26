import React from 'react'

const StyleTest: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Tailwind CSS Theme Test</h1>

      {/* Color Examples */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Color Palette</h2>
        <div className="flex space-x-4">
          <div className="bg-blue-500 text-white p-4 rounded">Blue</div>
          <div className="bg-red-500 text-white p-4 rounded">Red</div>
          <div className="bg-green-500 text-white p-4 rounded">Green</div>
          <div className="bg-yellow-500 text-white p-4 rounded">Yellow</div>
        </div>
      </div>

      {/* Spacing Examples */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Spacing</h2>
        <div className="mb-4">
          <div className="bg-gray-300 p-4 mb-2">Margin Bottom 2</div>
          <div className="bg-gray-300 p-8">Padding 8</div>
        </div>
      </div>

      {/* Typography Examples */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Typography</h2>
        <p className="text-lg">This is a paragraph demonstrating the default text styling.</p>
        <p className="text-xl font-bold">This is a bold text example.</p>
        <p className="text-sm italic">This is an italic text example.</p>
      </div>

      {/* Tailwind Typography Plugin Examples */}
      <div className="mb-6 prose">
        <h2 className="text-2xl font-semibold">Tailwind Typography Plugin</h2>
        <article className="prose">
          <h3>Heading 3</h3>
          <p>
            This is a paragraph styled with the Tailwind Typography plugin. It provides a beautiful
            default styling for your text.
          </p>
          <blockquote>
            <p>
              This is a blockquote example, showcasing how quotes can be styled using the typography
              plugin.
            </p>
          </blockquote>
          <h4>List Example</h4>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
            <li>List item 3</li>
          </ul>
        </article>
      </div>

      {/* Flexbox Example */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Flexbox Layout</h2>
        <div className="flex space-x-4">
          <div className="bg-purple-500 text-white p-4 flex-1">Flex Item 1</div>
          <div className="bg-purple-700 text-white p-4 flex-1">Flex Item 2</div>
        </div>
      </div>

      {/* Responsive Design Example */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Responsive Design</h2>
        <div className="bg-teal-500 text-white p-4 md:p-8 lg:p-12">
          This padding changes based on screen size.
        </div>
      </div>
    </div>
  )
}

export default StyleTest
