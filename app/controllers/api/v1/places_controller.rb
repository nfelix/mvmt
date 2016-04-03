class Api::V1::PlacesController < Api::V1::BaseController
  def index
    # @place = Place.where(:approved => true).shuffle
    @place = Place.all
    render(json: @place)
  end

  def show
    resource = Place.find(params[:id])
    render(json: Api::V1::PlaceSerializer.new(resource).to_json)
  end

  def update
    resource = Place.find(params[:id])
    if !resource.update_attributes(update_params)
      return api_error(status: 422, errors: user.errors)
    else
      render :nothing => true, :status => 200
    end
  end

  private
  def create_params
    params.require(:place).permit(
        :id, :name, :clickthrough
    )
  end

  def update_params
    create_params
  end
end
