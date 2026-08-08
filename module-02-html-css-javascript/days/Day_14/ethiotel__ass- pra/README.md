# Ethio Telecom Web Interface Rebuild

## Project Description

This project is an educational rebuild of the overall layout of the
Ethio Telecom website.

The goal was to practice modern CSS layout techniques rather than
copying the original website pixel-by-pixel.

## Technologies

- HTML5
- CSS3
- CSS Grid
- Flexbox
- Responsive Design
- Media Queries
- CSS Positioning

## CSS Grid Usage

CSS Grid is used for the main page skeleton:

- Header
- Sidebar
- Main content
- Footer

Grid is also used for:

- Service cards
- Package cards
- News cards
- Footer columns

The responsive card grids use:

`repeat(auto-fit, minmax(...))`

## Flexbox Usage

Flexbox is used for:

- Navigation bar
- Navigation links
- Hero buttons
- Contact section
- Footer bottom section

## Positioning

The project demonstrates:

- `position: sticky` for the header
- `position: relative` for package cards
- `position: absolute` for the package badge

## Responsive Design

A media query is used to collapse the main page layout
into a single-column layout on smaller screens.

The responsive card grids automatically change their
column count using CSS Grid.

## Reference

Ethio Telecom:
https://www.ethiotelecom.et/

This is an educational recreation and is not an official
Ethio Telecom website.