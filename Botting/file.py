import all_func
from flask import Flask, render_template
import folium

app = Flask(__name__)

@app.route('/')
def index():
    # Create a map
    my_map = folium.Map(location=[40.7128, -74.0060], zoom_start=12)

    # Add markers to the map
    place_ids = ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJKxDbe_lZwokR8mSt0B8iU_c"]
    for place_id in place_ids:
        lat, lng, name = all_func.get_place_coordinates(place_id)
        if lat and lng:
            folium.Marker([lat, lng], popup=name).add_to(my_map)

    # Save the map to an HTML file and render it
    my_map.save("map.html")
    return render_template("map.html")

if __name__ == '__main__':
    app.run(debug=True)
