Rails.application.routes.draw do

  devise_for :users
  #racine de l'app
  root to: 'cities#home', as: :root
  #envoie de la ville recherchée
  post '/search', to: 'cities#search', as: :search_city
  get '/explications', to: 'cities#explications', as: :explications

  #envoie de la ville vers la page choix
  post '/city', to: 'monuments#search', as: :post_city
  #get de la page choix
  get '/vos-monuments', to: 'monuments#choice', as: :choice
  #envoie de @selected
  post '/vos-monuments', to: 'monuments#validate', as: :post_validate
  #affichage du recap
  get '/synthese', to: 'monuments#recap', as: :recap

  #envoie des choix de monuments validés par l'utilisateur
  post '/itineraire', to: 'itineraires#compute', as: :post_itinary
  #affichage de l'itinéraire
  get '/itineraire', to: 'itineraires#show', as: :itinary


end
