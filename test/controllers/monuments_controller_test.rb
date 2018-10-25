require 'test_helper'

class MonumentsControllerTest < ActionDispatch::IntegrationTest
  test "should get search" do
    get monuments_search_url
    assert_response :success
  end

  test "should get choice" do
    get monuments_choice_url
    assert_response :success
  end

  test "should get validate" do
    get monuments_validate_url
    assert_response :success
  end

  test "should get recap" do
    get monuments_recap_url
    assert_response :success
  end

end
