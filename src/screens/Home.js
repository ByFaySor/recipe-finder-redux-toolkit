import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col,
  Card, CardImg, CardBody,
  CardTitle
} from 'reactstrap';
import Header from './layout/Header';
import API from './../config/api';
import { Recipe } from './../features/recipe/Recipe';

function Home() {
  const [recipes, setRecipes] = useState([])

  async function getRandomRecipes() {
    try {
      const response = await API.getRandomRecipes(10)
      setRecipes(response.data.recipes)
    } catch (e) {
      const error =
        typeof e === `string` ? e : `Hubo un error inesperado, reintenta.`
      console.log(error)
    }
  }

  useEffect(() => {
    getRandomRecipes()
  }, [])

  return (
    <Container>
      <Header />
      <Recipe />
      <Row>
        <p>Recetas que le puede interesar</p>
      </Row>
      <Row>
        {recipes.map(recipe => {
          return (
            <Col md={3} key={recipe.id}>
              <Card>
                <CardImg top width="100%" src={recipe.image} alt={recipe.title} />
                <CardBody>
                  <CardTitle>{recipe.title}</CardTitle>
                </CardBody>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Container>
  );
}

export default Home;