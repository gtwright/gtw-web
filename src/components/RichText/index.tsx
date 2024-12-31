import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react'
import { cn } from '@/lib/utils/cn'
import type {
  BannerBlock as BannerBlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<BannerBlockProps | CodeBlockProps | MediaBlockProps>

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    mediaBlock: ({ node }) => <MediaBlock className="col-start-2 mb-4" {...node.fields} />,
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
  },
})

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <RichTextWithoutBlocks
      converters={jsxConverters}
      className={cn(
        {
          'container ': enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert ': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
