import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import CreatePost from "@/components/CreatePost";
import { router } from "expo-router";
import { createPost } from "@/lib/db/posts";

export default function CreatePostScreen() {
  const handleSubmit = async (imageUrl: string, description: string) => {
    try {
      await createPost(imageUrl, description);
      router.push("/");
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <View style={styles.container}>
      <CreatePost onSubmit={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});