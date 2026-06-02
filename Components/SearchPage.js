import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RECENT_KEY = 'recent_searches';

const SearchPage = ({ allItems = [] }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    loadRecent();
  }, []);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const q = query.toLowerCase();
    const filtered = (allItems || []).filter(item => {
      return item.title && item.title.toLowerCase().includes(q);
    }).slice(0, 7);

    setSuggestions(filtered);
  }, [query, allItems]);

  const loadRecent = async () => {
    try {
      const raw = await AsyncStorage.getItem(RECENT_KEY);
      if (raw) setRecent(JSON.parse(raw));
    } catch (e) {}
  };

  const saveRecent = async (term) => {
    try {
      const updated = [term, ...(recent.filter(r => r !== term))].slice(0, 6);
      setRecent(updated);
      await AsyncStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    } catch (e) {}
  };

  const onSelectSuggestion = (item) => {
    const term = item.title || '';
    setQuery(term);
    saveRecent(term);
  };

  const onSubmit = () => {
    if (!query) return;
    saveRecent(query);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search places, categories..."
          placeholderTextColor="#9aa4b2"
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={onSubmit}
          clearButtonMode="while-editing"
        />
      </View>

      {query ? (
        <FlatList
          style={styles.suggestions}
          data={suggestions}
          keyExtractor={(item) => item.id || item.title}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.suggestionItem} onPress={() => onSelectSuggestion(item)}>
             <Image source={{ uri: item.image }} style={styles.image} />
             <View style={{justifyContent:'center', flexDirection:'column'}}>
              <Text style={styles.suggestionText}>{item.title}</Text>
              {item.category ? <Text style={styles.suggestionSub}>{item.category}</Text> : null}
             </View>

            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <View style={styles.empty}><Text style={styles.emptyText}>No results</Text></View>
          )}
        />
      ) : (
        <View style={styles.recentBox}>
          <Text style={styles.recentTitle}>Recent searches</Text>
          {recent.length === 0 ? (
            <Text style={styles.emptyText}>No recent searches</Text>
          ) : (
            recent.map((r) => (
              <TouchableOpacity key={r} style={styles.recentItem} onPress={() => setQuery(r)}>
                <Text style={styles.recentText}>{r}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 12 },
  searchRow: { marginVertical: 8 },
  input: {
    height: 48,
    backgroundColor: 'white',
    borderRadius: 40,
    paddingHorizontal: 12,
    color: '#22313F',
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#4F6D9A'
  },
  suggestions: { marginTop: 8 },
  suggestionItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#f0f3f6', flexDirection: 'row', gap: 12 },
  suggestionText: { fontSize: 16, color: '#22313F' },
  suggestionSub: { fontSize: 12, color: '#8f9aa6', marginTop: 4 },
  empty: { padding: 16 },
  emptyText: { color: '#9aa4b2' },
  recentBox: { marginTop: 12 },
  recentTitle: { color: '#4F6D9A', marginBottom: 8, fontSize: 14 },
  recentItem: { paddingVertical: 8 },
  recentText: { color: '#22313F' },
  image:{ width:40, height:40, borderRadius:8 }
});

export default SearchPage;
