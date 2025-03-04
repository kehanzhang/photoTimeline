import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { Text } from './Themed';

interface PostProps {
  imageUrl: string;
  description?: string;
  createdAt: number;
}

export default function Post({ imageUrl, description, createdAt }: PostProps) {
  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <View style={styles.container}>
      <Text style={styles.timestamp}>{formattedDate}</Text>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  description: {
    padding: 15,
    fontSize: 16,
  },
  timestamp: {
    padding: 10,
    fontSize: 14,
    color: '#666',
  },
});