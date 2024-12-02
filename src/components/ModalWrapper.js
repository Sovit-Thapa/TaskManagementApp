import React from "react";
import { Modal, View, StyleSheet } from "react-native";

const ModalWrapper = ({ visible, children, onClose }) => (
    <Modal visible={visible} transparent animationType="fade">
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                {children}
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
    },
});

export default ModalWrapper;
