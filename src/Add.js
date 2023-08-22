import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import SnackOrBoozeApi from "./Api";

function Add({ setSnacks, setDrinks }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [serve, setServe] = useState("");
    const [recipe, setRecipe] = useState("");

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a new item object with the form data
        const newItem = {
            id: name.toLowerCase(),
            name,
            description,
            type,
            recipe,
            serve,
        };
        console.log("Logging new item data:", newItem);

        try {
            if (type === "snacks") {
                // Send a request to your API to add the new item
                await SnackOrBoozeApi.addSnack(newItem);
                console.log("Item added successfully");

                const updatedSnacks = await SnackOrBoozeApi.getSnacks();
                setSnacks(updatedSnacks);

                // Redirect to the appropriate menu page after adding
                history.push("/snacks");

            } else if (type === "drinks") {
                await SnackOrBoozeApi.addDrink(newItem);

                console.log("Item added successfully");

                const updatedDrinks = await SnackOrBoozeApi.getDrinks();
                setDrinks(updatedDrinks);

                history.push("/drinks");
            }
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    return (
        <div>
            <h2>Add New Item</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                        type="textarea"
                        name="description"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="type">Type</Label>
                    <Input
                        type="select"
                        name="type"
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            Select Type
                        </option>
                        <option value="snacks">Snacks</option>
                        <option value="drinks">Drinks</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="recipe">Recipe</Label>
                    <Input
                        type="text"
                        name="recipe"
                        id="recipe"
                        value={recipe}
                        onChange={(e) => setRecipe(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="serve">Serve</Label>
                    <Input
                        type="text"
                        name="serve"
                        id="serve"
                        value={serve}
                        onChange={(e) => setServe(e.target.value)}
                    />
                </FormGroup>
                <Button type="submit" color="primary">
                    Add Item
                </Button>
            </Form>
        </div>
    );
}

export default Add;
