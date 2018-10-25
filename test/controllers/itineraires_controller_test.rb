require 'test_helper'

class ItinerairesControllerTest < ActionDispatch::IntegrationTest
  test "should get compute" do
    get itineraires_compute_url
    assert_response :success
  end

  test "should get show" do
    get itineraires_show_url
    assert_response :success
  end

end
