import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const KEY = 'visibility';

const PlanItem = ({ attraction }) => {
  const [visibility, setVisibility] = useState({});

  const id = attraction.title; // or another unique identifier like attraction.id

  useEffect(() => {
    const loadVisibility = async () => {
      try {
        const stored = await AsyncStorage.getItem(KEY);
        if (stored) {
          setVisibility(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Error loading visibility:", error);
      }
    };

    loadVisibility();
  }, []);

  const toggleVisibility = async () => {
    const newVisibility = {
      ...visibility,
      [id]: !visibility[id],
    };
    setVisibility(newVisibility);
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(newVisibility));
    } catch (e) {
      console.error('Failed to save visibility state', e);
    }
  };

  const isVisible = visibility[id] !== false; // default to true if not explicitly false

  return (
    <View style={[styles.container, { opacity: isVisible ? 1 : 0.3 }]}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Image source={{ uri: attraction.image }} style={styles.image} />
        <View style={{ gap: 2 }}>
          <Text style={styles.title}>{attraction.title}</Text>
          <Text style={styles.price}>{attraction.price}</Text>
          <Text style={styles.description}>
            Suggested for <Text style={{ color: '#3B5C8E', fontWeight: '700' }}>{attraction.duration}</Text>
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{ flexDirection: 'row', alignSelf: 'flex-end', marginRight: 10, paddingBottom: 8 }}
        onPress={toggleVisibility}
      >
        {isVisible ? (
          <Icon name="visibility" size={18} style={{ color: '#A6B1C1' }} />
        ) : (
          <Text style={styles.description}>Visited</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    margin: 8,
    marginBottom: 10,
    padding: 4,
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 1,
    color: '#3B5C8E',
  },
  price: {
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 1,
    color: '#4F6D9A',
  },
  description: {
    fontSize: 12,
    color: '#A6B1C1',
  },
});

export default PlanItem;
