import { useTypedSelector } from "../../../hooks/store/useTypedSelector";
import { selectPosts } from "../../../store/slices/posts/posts.slice";
import Layout from "../../layout/Layout";
import Post from "./post/Post";
import styles from "./Home.module.scss";

const Home = () => {
  const { posts } = useTypedSelector(selectPosts);
  return (
    <Layout title="Home">
      <div className={styles.home}>
        {posts.map((post) => (
          <Post key={post.post.id} post={post} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
