import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Image, TouchableOpacity, Platform } from 'react-native';
import { Text } from './Themed';
import * as ImagePicker from 'expo-image-picker';
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface CreatePostProps {
  onSubmit: (imageUrl: string, description: string) => void;
}

export default function CreatePost({ onSubmit }: CreatePostProps) {
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (image) {
      onSubmit(image, description);
      setImage(null);
      setDescription('');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.previewImage} />
        ) : (
          <View style={styles.placeholder}>
            <FontAwesome name="camera" size={40} color="#666" />
            <Text style={styles.placeholderText}>Tap to select an image</Text>
          </View>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Write a description..."
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity
        style={[styles.submitButton, !image && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={!image}
      >
        <Text style={styles.submitButtonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  imagePickerButton: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 10,
    color: '#666',
  },
  input: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#0095f6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});