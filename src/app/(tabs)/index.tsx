import { StyleSheet, FlatList, RefreshControl } from "react-native";
import { View } from "@/components/Themed";
import Post from "@/components/Post";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  imageUrl: string;
  description: string | null;
  createdAt: number;
}

export default function TimelineScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = async () => {
    try {
      const posts = await getPosts();
      setPosts(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Post
            imageUrl={item.imageUrl}
            description={item.description || undefined}
            createdAt={item.createdAt}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
