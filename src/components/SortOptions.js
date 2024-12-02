import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SortOptions = ({ sortOption, setSortOption }) => (
    <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <TouchableOpacity
            style={[
                styles.sortButton,
                sortOption === "date" && styles.activeSortButton,
            ]}
            onPress={() => setSortOption("date")}
        >
            <Text style={styles.sortButtonText}>Date</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[
                styles.sortButton,
                sortOption === "alphabetical" && styles.activeSortButton,
            ]}
            onPress={() => setSortOption("alphabetical")}
        >
            <Text style={styles.sortButtonText}>Alphabetical</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    sortContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 10,
    },
    sortLabel: {
        fontSize: 16,
        marginRight: 10,
    },
    sortButton: {
        padding: 10,
        backgroundColor: "#b7b2b2",
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeSortButton: {
        backgroundColor: "#4CAF50",
    },
    sortButtonText: {
        color: "#fff",
    },
});

export default SortOptions;
