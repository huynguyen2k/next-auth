import useSWRInfinite from 'swr/infinite';

export interface PostListProps {}

export function PostList(props: PostListProps) {
  const getKey = (pageIndex: any, previousPageData: any) => {
    return `/posts?_page=${pageIndex + 1}&_limit=10`;
  };

  const { data, error, isValidating, mutate, size, setSize } = useSWRInfinite(getKey, {
    initialSize: 1,
    revalidateFirstPage: false,
    revalidateAll: false,
    persistSize: false,
  });

  if (!data) return null;

  let totalPosts = 0;
  for (let i = 0; i < data.length; i++) {
    totalPosts += data[i].data.length;
  }

  const showLoadMoreBtn = () => {
    if (isValidating) return false;

    if (!data || !data.length) return false;

    const pagination = data[0].pagination;
    const maxPages = Math.ceil(pagination._totalRows / pagination._limit);

    return size < maxPages;
  };

  return (
    <div>
      <h1>Posts list</h1>
      <h5>Total posts: {totalPosts}</h5>

      <ul>{data.map((posts: any) => posts.data.map((post: any) => <li key={post.id}>{post.title}</li>))}</ul>

      {isValidating && <h5>Loading ...</h5>}
      {showLoadMoreBtn() && <button onClick={() => setSize(size + 1)}>Load more</button>}
    </div>
  );
}
