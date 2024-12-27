import type { FC } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";


const components = {
};

interface IMDXProps {
  children: string;
}

const MDX: FC<IMDXProps> = ({ children: source }) => {
  return (
    <MDXRemote
      components={components}
      source={source}
    />
  )
};


export default MDX;
