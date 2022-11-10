import { PostList } from '../components/common';

export interface PostListPageProps {}

export default function PostListPage(props: PostListPageProps) {
  return (
    <div>
      <PostList />
    </div>
  );
}
