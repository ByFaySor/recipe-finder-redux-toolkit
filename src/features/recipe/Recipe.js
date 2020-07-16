import React, { useState } from 'react';
import {
  Row, Col,
  ButtonGroup, Button,
  FormGroup, Input,
  Card, CardImg, CardBody,
  CardTitle
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  setRecipe,
  getRecipes,
  selectRecipe,
  selectSearchRecipes,
  setFilterButtonValue,
} from './recipeSlice';
//mport styles from './Recipe.module.css';

const initialFilterButtons = [
  { text: `Vegan`, actived: false, },
  { text: `Italian`, actived: false, },
  { text: `Chinese`, actived: false, },
  { text: `French`, actived: false, },
  { text: `Main Course`, actived: false, },
  { text: `Dessert`, actived: false, },
  { text: `Salad`, actived: false, },
  { text: `All`, actived: true, },
]

export function Recipe() {
  const recipe = useSelector(selectRecipe);
  const searchRecipes = useSelector(selectSearchRecipes);
  const [filterButtons, setFilterButtons] = useState(initialFilterButtons)

  const dispatch = useDispatch();

  const onClickFilterButton = (text) => {
    dispatch(setFilterButtonValue(text))

    setFilterButtons(filterButtons.map(filterButton => {
      filterButton.actived = false

      if (filterButton.text === text) {
        filterButton.actived = true
      }

      return filterButton
    }))

    dispatch(getRecipes())
  }

  return (
    <>
      <Row form>
        <Col md={11}>
          <FormGroup>
            <Input
              type="text"
              value={recipe}
              placeholder="Buscador recetas"
              onChange={e => dispatch(setRecipe(e.target.value))}
            />
          </FormGroup>
        </Col>
        <Col md={1}>
          <Button
            block
            onClick={() => dispatch(getRecipes())}
          >
            BUSCAR
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={11}>
          <ButtonGroup>
            {filterButtons.map(filterButton => (
                <Button
                  color="primary"
                  active={filterButton.actived}
                  onClick={() => onClickFilterButton(filterButton.text)}
                >
                  {filterButton.text}
                </Button>
              )
            )}
          </ButtonGroup>
        </Col>
      </Row>
      {searchRecipes.length > 0 && (
        <>
          <Row>
            <p>Resultados de la búsqueda</p>
          </Row>
          <Row>
            {searchRecipes.map(searchRecipe => {
              return (
                <Col md={3} key={`search-recipe-${searchRecipe.id}`}>
                  <Card>
                    <CardImg top width="100%" src={searchRecipe.image} alt={searchRecipe.title} />
                    <CardBody>
                      <CardTitle>{searchRecipe.title}</CardTitle>
                    </CardBody>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </>
      )}
    </>
  );
}
